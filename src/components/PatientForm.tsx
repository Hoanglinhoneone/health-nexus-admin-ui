import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface Patient {
  id?: string
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

interface PatientFormProps {
  patient?: Patient
  onSave: (patient: Omit<Patient, 'id'>) => void
  onCancel: () => void
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function PatientForm({ patient, onSave, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState<Omit<Patient, 'id'>>({
    name: patient?.name || "",
    email: patient?.email || "",
    phone: patient?.phone || "",
    dateOfBirth: patient?.dateOfBirth || "",
    gender: patient?.gender || "",
    address: patient?.address || "",
    emergencyContact: patient?.emergencyContact || "",
    medicalHistory: patient?.medicalHistory || "",
    allergies: patient?.allergies || "",
    bloodType: patient?.bloodType || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          {patient ? "Chỉnh sửa thông tin bệnh nhân" : "Thêm bệnh nhân mới"}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nhập họ tên bệnh nhân"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="patient@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="0123456789"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Giới tính *</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodType">Nhóm máu</Label>
              <Select 
                value={formData.bloodType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, bloodType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm máu" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Liên hệ khẩn cấp</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                placeholder="Tên và số điện thoại người thân"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Số nhà, đường, phường, quận, thành phố"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Tiền sử bệnh</Label>
            <Textarea
              id="medicalHistory"
              value={formData.medicalHistory}
              onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.value }))}
              placeholder="Các bệnh đã mắc, phẫu thuật đã thực hiện..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Dị ứng</Label>
            <Textarea
              id="allergies"
              value={formData.allergies}
              onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
              placeholder="Thuốc, thực phẩm, chất gây dị ứng..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {patient ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}