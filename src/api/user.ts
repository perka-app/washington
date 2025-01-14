import axios from 'axios'

import { LoginCredentials } from 'models/LoginCredentials'
import { LoginResponse } from 'models/LoginResponse'
import { User } from 'models/UserModel'

const API = process.env.REACT_APP_API_URL

export const login = async ({ login, password }: LoginCredentials): Promise<string> => {
  console.log('API:', API)

  try {
    const response = await axios.post<LoginResponse>(`${API}/auth/organisation`, {
      login,
      password,
    })

    return response?.data?.access_token
  } catch (error) {
    throw error
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
  } catch (error) {
    throw error
  }
}