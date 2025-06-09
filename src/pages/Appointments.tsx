import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppointmentForm } from "@/components/AppointmentForm"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Calendar, Search, Plus, Edit, X, Clock, ArrowLeft, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiService, Appointment } from "@/lib/api"

const statusLabels = {
  scheduled: { label: "Đã đặt lịch", variant: "secondary" as const },
  confirmed: { label: "Đã xác nhận", variant: "default" as const },
  completed: { label: "Hoàn thành", variant: "default" as const },
  cancelled: { label: "Đã hủy", variant: "destructive" as const },
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | undefined>()
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const data = await apiService.getAppointments()
      setAppointments(data)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách lịch hẹn",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patientPhone.includes(searchTerm)
  )

  const handleSave = async (appointmentData: Omit<Appointment, 'id'>) => {
    try {
      if (editingAppointment) {
        // Update existing appointment
        await apiService.updateAppointment(editingAppointment.id!, appointmentData)
        toast({
          title: "Thành công",
          description: "Đã cập nhật lịch hẹn",
        })
      } else {
        // Add new appointment
        await apiService.createAppointment(appointmentData)
        toast({
          title: "Thành công",
          description: "Đã đặt lịch hẹn mới",
        })
      }
      await loadAppointments()
      setShowForm(false)
      setEditingAppointment(undefined)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: editingAppointment ? "Không thể cập nhật lịch hẹn" : "Không thể đặt lịch hẹn",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setShowForm(true)
  }

  const handleDelete = async (appointmentId: string) => {
    try {
      await apiService.deleteAppointment(appointmentId)
      await loadAppointments()
      toast({
        title: "Đã hủy",
        description: "Lịch hẹn đã được hủy",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể hủy lịch hẹn",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingAppointment(undefined)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
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
                  {editingAppointment ? 'Sửa lịch hẹn' : 'Đặt lịch hẹn mới'}
                </h1>
              </div>
            </header>
            <div className="p-6">
              <AppointmentForm
                appointment={editingAppointment}
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
              <h1 className="text-xl font-semibold">Quản lý lịch hẹn</h1>
              <p className="text-sm text-muted-foreground">Quản lý lịch hẹn khám bệnh trong hệ thống</p>
            </div>
          </header>
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Danh sách lịch hẹn</h2>
              </div>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Đặt lịch hẹn
              </Button>
            </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo tên bệnh nhân, bác sỹ, chuyên khoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{appointments.length}</p>
                <p className="text-sm text-muted-foreground">Tổng lịch hẹn</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {appointments.filter(a => a.status === 'scheduled').length}
                </p>
                <p className="text-sm text-muted-foreground">Đã đặt lịch</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </p>
                <p className="text-sm text-muted-foreground">Đã xác nhận</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {appointments.filter(a => a.status === 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">Hoàn thành</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                      <p className="text-sm text-muted-foreground">SĐT: {appointment.patientPhone}</p>
                    </div>
                    <Badge 
                      variant={statusLabels[appointment.status as keyof typeof statusLabels]?.variant}
                    >
                      {statusLabels[appointment.status as keyof typeof statusLabels]?.label}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Bác sỹ</p>
                      <p>{appointment.doctorName}</p>
                      <p className="text-xs text-muted-foreground">{appointment.specialty}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Ngày khám</p>
                      <p>{formatDate(appointment.appointmentDate)}</p>
                      <p className="text-xs text-muted-foreground">Lúc {appointment.appointmentTime}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Lý do khám</p>
                      <p className="text-sm">{appointment.reason}</p>
                    </div>
                    {appointment.notes && (
                      <div>
                        <p className="font-medium text-muted-foreground">Ghi chú</p>
                        <p className="text-sm">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(appointment)}
                    className="h-8 w-8"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(appointment.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Không có lịch hẹn</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Không tìm thấy lịch hẹn phù hợp" : "Chưa có lịch hẹn nào trong hệ thống"}
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