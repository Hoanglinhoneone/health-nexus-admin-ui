const API_BASE_URL = 'http://127.0.0.1:8000/api'

// Types
export interface Doctor {
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

export interface Appointment {
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

// API Service
class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Doctor API
  async getDoctors(): Promise<Doctor[]> {
    return this.request<Doctor[]>('/doctors/')
  }

  async createDoctor(doctor: Omit<Doctor, 'id'>): Promise<Doctor> {
    return this.request<Doctor>('/doctors/', {
      method: 'POST',
      body: JSON.stringify(doctor),
    })
  }

  async updateDoctor(id: string, doctor: Omit<Doctor, 'id'>): Promise<Doctor> {
    return this.request<Doctor>(`/doctors/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(doctor),
    })
  }

  async deleteDoctor(id: string): Promise<void> {
    return this.request<void>(`/doctors/${id}/`, {
      method: 'DELETE',
    })
  }

  // Appointment API
  async getAppointments(filters?: { doctor?: string; status?: string }): Promise<Appointment[]> {
    let endpoint = '/appointments/'
    const params = new URLSearchParams()
    
    if (filters?.doctor) params.append('doctor', filters.doctor)
    if (filters?.status) params.append('status', filters.status)
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`
    }
    
    return this.request<Appointment[]>(endpoint)
  }

  async getAppointment(id: string): Promise<Appointment> {
    return this.request<Appointment>(`/appointments/${id}/`)
  }

  async createAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    return this.request<Appointment>('/appointments/', {
      method: 'POST',
      body: JSON.stringify(appointment),
    })
  }

  async updateAppointment(id: string, appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    return this.request<Appointment>(`/appointments/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(appointment),
    })
  }

  async deleteAppointment(id: string): Promise<void> {
    return this.request<void>(`/appointments/${id}/`, {
      method: 'DELETE',
    })
  }
}

export const apiService = new ApiService()