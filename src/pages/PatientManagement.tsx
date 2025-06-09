import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PatientForm } from "@/components/PatientForm"
import { UserPlus, Search, Plus, Edit, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  emergencyContact: string
  medicalHistory: string
  allergies: string
  bloodType: string
}

// Mock data
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Nguyễn Thị C",
    email: "nguyenthic@email.com",
    phone: "0123456789",
    dateOfBirth: "1990-05-15",
    gender: "female",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    emergencyContact: "Nguyễn Văn D - 0987654321",
    medicalHistory: "Tiền sử cao huyết áp",
    allergies: "Dị ứng penicillin",
    bloodType: "A+"
  },
  {
    id: "2",
    name: "Trần Văn E",
    email: "tranvane@email.com", 
    phone: "0987654321",
    dateOfBirth: "1985-12-20",
    gender: "male",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
    emergencyContact: "Trần Thị F - 0123456789",
    medicalHistory: "Phẫu thuật ruột thừa năm 2010",
    allergies: "Không có",
    bloodType: "O-"
  }
]

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>()
  const { toast } = useToast()

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSave = (patientData: Omit<Patient, 'id'>) => {
    if (editingPatient) {
      // Update existing patient
      setPatients(prev => prev.map(p => 
        p.id === editingPatient.id 
          ? { ...patientData, id: editingPatient.id }
          : p
      ))
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin bệnh nhân",
      })
    } else {
      // Add new patient
      const newPatient: Patient = {
        ...patientData,
        id: Date.now().toString()
      }
      setPatients(prev => [...prev, newPatient])
      toast({
        title: "Thành công",
        description: "Đã thêm bệnh nhân mới",
      })
    }
    setShowForm(false)
    setEditingPatient(undefined)
  }

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient)
    setShowForm(true)
  }

  const handleDelete = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId))
    toast({
      title: "Đã xóa",
      description: "Bệnh nhân đã được xóa khỏi hệ thống",
    })
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingPatient(undefined)
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  if (showForm) {
    return (
      <div className="container mx-auto p-6">
        <PatientForm
          patient={editingPatient}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý bệnh nhân</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý hồ sơ bệnh nhân trong hệ thống
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Thêm bệnh nhân
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo tên, số điện thoại, email..."
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
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{patients.length}</p>
                <p className="text-sm text-muted-foreground">Tổng bệnh nhân</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {patients.filter(p => p.gender === 'male').length}
                </p>
                <p className="text-sm text-muted-foreground">Nam</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <UserPlus className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {patients.filter(p => p.gender === 'female').length}
                </p>
                <p className="text-sm text-muted-foreground">Nữ</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {patients.filter(p => p.allergies && p.allergies !== "Không có").length}
                </p>
                <p className="text-sm text-muted-foreground">Có dị ứng</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {patient.gender === 'male' ? 'Nam' : patient.gender === 'female' ? 'Nữ' : 'Khác'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {calculateAge(patient.dateOfBirth)} tuổi
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(patient)}
                    className="h-8 w-8"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(patient.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p><span className="font-medium">SĐT:</span> {patient.phone}</p>
                <p><span className="font-medium">Email:</span> {patient.email}</p>
                <p><span className="font-medium">Nhóm máu:</span> {patient.bloodType || "Chưa xác định"}</p>
                <p><span className="font-medium">Liên hệ khẩn cấp:</span> {patient.emergencyContact || "Chưa có"}</p>
              </div>
              
              {patient.address && (
                <p className="text-sm">
                  <span className="font-medium">Địa chỉ:</span> {patient.address}
                </p>
              )}
              
              {patient.medicalHistory && (
                <div>
                  <p className="text-sm font-medium">Tiền sử bệnh:</p>
                  <p className="text-sm text-muted-foreground">{patient.medicalHistory}</p>
                </div>
              )}
              
              {patient.allergies && patient.allergies !== "Không có" && (
                <div>
                  <p className="text-sm font-medium text-destructive">Dị ứng:</p>
                  <p className="text-sm text-destructive">{patient.allergies}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Không tìm thấy bệnh nhân</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Chưa có bệnh nhân nào trong hệ thống"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}