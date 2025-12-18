import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Endpoints
export const endpoints = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  // Attendance
  markAttendance: (data: { type: string; notes?: string }) =>
    api.post('/attendance', data),
  getTodayAttendance: () => api.get('/attendance/today'),

  // Patients
  getPatients: (params?: { search?: string; status?: string }) =>
    api.get('/patients', { params }),
  
  // Appointments
  getAppointments: (params?: { date?: string }) =>
    api.get('/appointments', { params }),

  // Dashboard
  getDashboardStats: () => api.get('/dashboard/stats'),
}