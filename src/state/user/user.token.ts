import { jwtDecode } from 'jwt-decode'

type JwtPayload = {
  exp: number
}

export const removeToken = () => {
  localStorage.setItem('userToken', '')
}

export const saveToken = (token: string) => {
  localStorage.setItem('userToken', token)
}

export const getToken = () => {
  const token = localStorage.getItem('userToken')

  if (!token) {
    return null
  }

  const decoded: JwtPayload = jwtDecode(token)
  const currentTime = Date.now() / 1000

  if (decoded.exp < currentTime) {
    removeToken()

    console.log('Token has expired')
    return null
  }

  return token
}
