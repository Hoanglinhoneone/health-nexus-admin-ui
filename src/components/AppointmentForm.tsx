import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface Appointment {
  id?: string
  patientName: string
  patientPhone: string
  doctorName: string
  specialty: string
  appointmentDate: string
  appointmentTime: string
  reason: string
  status: string
  notes: string
}

interface AppointmentFormProps {
  appointment?: Appointment
  onSave: (appointment: Omit<Appointment, 'id'>) => void
  onCancel: () => void
}

const doctors = [
  { name: "BS. Nguyễn Văn A", specialty: "Tim mạch" },
  { name: "BS. Trần Thị B", specialty: "Nhi khoa" },
  { name: "BS. Lê Văn C", specialty: "Da liễu" },
  { name: "BS. Phạm Thị D", specialty: "Thần kinh" },
  { name: "BS. Hoàng Văn E", specialty: "Nội tổng hợp" },
]

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
]

const appointmentStatus = [
  { value: "scheduled", label: "Đã đặt lịch" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
]

export function AppointmentForm({ appointment, onSave, onCancel }: AppointmentFormProps) {
  const [formData, setFormData] = useState<Omit<Appointment, 'id'>>({
    patientName: appointment?.patientName || "",
    patientPhone: appointment?.patientPhone || "",
    doctorName: appointment?.doctorName || "",
    specialty: appointment?.specialty || "",
    appointmentDate: appointment?.appointmentDate || "",
    appointmentTime: appointment?.appointmentTime || "",
    reason: appointment?.reason || "",
    status: appointment?.status || "scheduled",
    notes: appointment?.notes || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleDoctorChange = (doctorName: string) => {
    const doctor = doctors.find(d => d.name === doctorName)
    setFormData(prev => ({
      ...prev,
      doctorName,
      specialty: doctor?.specialty || ""
    }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          {appointment ? "Chỉnh sửa lịch hẹn" : "Đặt lịch hẹn mới"}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Tên bệnh nhân *</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                placeholder="Nhập tên bệnh nhân"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientPhone">Số điện thoại *</Label>
              <Input
                id="patientPhone"
                value={formData.patientPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, patientPhone: e.target.value }))}
                placeholder="0123456789"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctorName">Bác sỹ *</Label>
              <Select 
                value={formData.doctorName} 
                onValueChange={handleDoctorChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bác sỹ" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(doctor => (
                    <SelectItem key={doctor.name} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Chuyên khoa</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                readOnly
                className="bg-muted"
                placeholder="Được chọn tự động"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Ngày hẹn *</Label>
              <Input
                id="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => setFormData(prev => ({ ...prev, appointmentDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentTime">Giờ hẹn *</Label>
              <Select 
                value={formData.appointmentTime} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, appointmentTime: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giờ" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentStatus.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Lý do khám *</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              placeholder="Mô tả triệu chứng, lý do cần khám..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Ghi chú thêm cho cuộc hẹn..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {appointment ? "Cập nhật" : "Đặt lịch"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}