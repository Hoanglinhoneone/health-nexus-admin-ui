import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DoctorForm } from "@/components/DoctorForm"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { User, Search, Plus, Edit, X, ArrowLeft, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiService, Doctor } from "@/lib/api"

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | undefined>()
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    try {
      setLoading(true)
      const data = await apiService.getDoctors()
      setDoctors(data)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách bác sỹ",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSave = async (doctorData: Omit<Doctor, 'id'>) => {
    try {
      if (editingDoctor) {
        // Update existing doctor
        await apiService.updateDoctor(editingDoctor.id!, doctorData)
        toast({
          title: "Thành công",
          description: "Đã cập nhật thông tin bác sỹ",
        })
      } else {
        // Add new doctor
        await apiService.createDoctor(doctorData)
        toast({
          title: "Thành công", 
          description: "Đã thêm bác sỹ mới",
        })
      }
      await loadDoctors()
      setShowForm(false)
      setEditingDoctor(undefined)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: editingDoctor ? "Không thể cập nhật bác sỹ" : "Không thể thêm bác sỹ",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    setShowForm(true)
  }

  const handleDelete = async (doctorId: string) => {
    try {
      await apiService.deleteDoctor(doctorId)
      await loadDoctors()
      toast({
        title: "Đã xóa",
        description: "Bác sỹ đã được xóa khỏi hệ thống",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa bác sỹ",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingDoctor(undefined)
  }

  if (showForm) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1">
            <header className="h-16 border-b bg-card flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <Button 
                variant="ghost" 
                onClick={handleCancel}
                className="mr-4 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Button>
              <div className="flex-1">
                <h1 className="text-xl font-semibold">
                  {editingDoctor ? 'Sửa thông tin bác sỹ' : 'Thêm bác sỹ mới'}
                </h1>
              </div>
            </header>
            <div className="p-6">
              <DoctorForm
                doctor={editingDoctor}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          </main>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1">
          <header className="h-16 border-b bg-card flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Quản lý bác sỹ</h1>
              <p className="text-sm text-muted-foreground">Quản lý thông tin bác sỹ trong hệ thống</p>
            </div>
          </header>
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Danh sách bác sỹ</h2>
              </div>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Thêm bác sỹ
              </Button>
            </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo tên, chuyên khoa, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{doctors.length}</p>
                <p className="text-sm text-muted-foreground">Tổng số bác sỹ</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{new Set(doctors.map(d => d.specialty)).size}</p>
                <p className="text-sm text-muted-foreground">Chuyên khoa</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {doctors.filter(d => d.availability.length > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Đang hoạt động</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctors List */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {doctor.specialty}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(doctor)}
                    className="h-8 w-8"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doctor.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Email:</span> {doctor.email}</p>
                <p><span className="font-medium">SĐT:</span> {doctor.phone}</p>
                <p><span className="font-medium">Kinh nghiệm:</span> {doctor.experience} năm</p>
                <p><span className="font-medium">Học vấn:</span> {doctor.education}</p>
              </div>
              
              {doctor.description && (
                <p className="text-sm text-muted-foreground">
                  {doctor.description}
                </p>
              )}
              
              {doctor.availability.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Khung giờ làm việc:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.availability.map((slot) => (
                      <Badge key={slot} variant="outline" className="text-xs">
                        {slot}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredDoctors.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Không tìm thấy bác sỹ</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Chưa có bác sỹ nào trong hệ thống"}
            </p>
          </CardContent>
        </Card>
      )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}