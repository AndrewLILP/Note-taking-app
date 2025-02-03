import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

// Create axios instance with default config
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if it exists
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle token expiration and other common errors
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>('/auth/login', credentials)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>('/auth/register', credentials)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  static async logout(): Promise<void> {
    try {
      await authApi.post('/auth/logout')
    } finally {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
  }

  static async checkAuth(): Promise<boolean> {
    try {
      const token = localStorage.getItem('token')
      if (!token) return false

      const response = await authApi.get('/auth/verify')
      return response.status === 200
    } catch (error) {
      return false
    }
  }

  static getToken(): string | null {
    return localStorage.getItem('token')
  }

  private static handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'An error occurred'
      throw new Error(message)
    }
    throw error
  }
}

export default AuthService