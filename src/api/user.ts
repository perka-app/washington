import axios, { AxiosError } from 'axios'

import { LoginCredentials } from 'models/LoginCredentials'
import { LoginResponse } from 'models/LoginResponse'
import { User } from 'models/UserModel'

const API = process.env.REACT_APP_API_URL
  ? `https://${process.env.REACT_APP_API_URL}`
  : 'http://localhost:3000'

export const login = async ({ login, password }: LoginCredentials): Promise<string> => {
  console.log('API:', API)

  try {
    const response = await axios.post<LoginResponse>(`${API}/auth/organisation`, {
      login,
      password,
    })

    return response?.data?.access_token
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An unknown error occurred')
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}

export const getUserData = async (token: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API}/organisations/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An unknown error occurred')
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}

export const uploadImage = async (token: string, image: File): Promise<void> => {
  const formData = new FormData()
  formData.append('file', image)

  try {
    await axios.post(`${API}/organisations/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An unknown error occurred')
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}
