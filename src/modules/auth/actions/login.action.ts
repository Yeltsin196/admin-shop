import { tesloApi } from "@/modules/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response"


import type { User } from "../interfaces/user.interface"
import { isAxiosError } from "axios"

interface LoginError{
	ok: false,
	message: string
}
interface LoginSuccess{
	ok: true,
	user: User,
	token: string,
}

export const loginAction = async (email: string, password: string): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    })
		
    return {
      ok: true,
      user: data.user,
      token: data.token,
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          ok: false,
          message: 'Usuario o contraseña incorrectos',
        }
      }
    }
    console.log(error)
    throw new Error('Error while logging')
  }
}
