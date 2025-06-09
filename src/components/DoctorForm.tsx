import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface Doctor {
  id?: string
  name: string
  email: string
  phone: string
  specialty: string
  experience: string
  education: string
  description: string
  availability: string[]
}

interface DoctorFormProps {
  doctor?: Doctor
  onSave: (doctor: Omit<Doctor, 'id'>) => void
  onCancel: () => void
}

const specialties = [
  "Tim mạch",
  "Nhi khoa", 
  "Da liễu",
  "Thần kinh",
  "Nội tổng hợp",
  "Ngoại tổng hợp",
  "Sản phụ khoa",
  "Mắt",
  "Tai mũi họng",
  "Răng hàm mặt"
]

const timeSlots = [
  "08:00-10:00",
  "10:00-12:00", 
  "14:00-16:00",
  "16:00-18:00",
  "18:00-20:00"
]

export function DoctorForm({ doctor, onSave, onCancel }: DoctorFormProps) {
  const [formData, setFormData] = useState<Omit<Doctor, 'id'>>({
    name: doctor?.name || "",
    email: doctor?.email || "",
    phone: doctor?.phone || "",
    specialty: doctor?.specialty || "",
    experience: doctor?.experience || "",
    education: doctor?.education || "",
    description: doctor?.description || "",
    availability: doctor?.availability || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const toggleAvailability = (timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(timeSlot)
        ? prev.availability.filter(slot => slot !== timeSlot)
        : [...prev.availability, timeSlot]
    }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          {doctor ? "Chỉnh sửa thông tin bác sỹ" : "Thêm bác sỹ mới"}
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
                placeholder="Nhập họ tên bác sỹ"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Chuyên khoa *</Label>
              <Select 
                value={formData.specialty} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, specialty: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chuyên khoa" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="doctor@example.com"
                required
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
              <Label htmlFor="experience">Kinh nghiệm (năm)</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Học vấn</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                placeholder="Đại học Y Hà Nội"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Mô tả về bác sỹ, kinh nghiệm làm việc..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Khung giờ làm việc</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {timeSlots.map(slot => (
                <div key={slot} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`slot-${slot}`}
                    checked={formData.availability.includes(slot)}
                    onChange={() => toggleAvailability(slot)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={`slot-${slot}`} className="text-sm">
                    {slot}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {doctor ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}