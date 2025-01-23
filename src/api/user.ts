import axios, { AxiosError } from 'axios'

import { LoginCredentials } from 'models/LoginCredentials'
import { LoginResponse } from 'models/LoginResponse'
import { User } from 'models/UserModel'

const API = process.env.REACT_APP_API_URL

export const login = async ({ login, password }: LoginCredentials): Promise<string> => {
  console.log('API:', API)
  console.log('NODE_ENV', process.env.NODE_ENV)
  console.log('NIXPACKS_BUILD_CMD', process.env.NIXPACKS_BUILD_CMD)
  console.log('NIXPACKS_BUILD_ENV', process.env.NIXPACKS_BUILD_ENV)
  console.log('NPM_CONFIG_FUND', process.env.NPM_CONFIG_FUND)

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
