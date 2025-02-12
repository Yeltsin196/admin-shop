import { tesloApi } from '@/modules/api/tesloApi'
import type { AuthResponse } from '../interfaces/auth.response'

import type { User } from '../interfaces/user.interface'


interface RegisterError {
  ok: false
  message: string
}
interface RegisterSuccess {
  ok: true
  user: User
  token: string
}

export const registerAction = async (
  email: string,
  password: string,
  fullName: string,
): Promise<RegisterError | RegisterSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    })
		console.log(data)
    return {
      ok: true,
      user: data.user,
      token: data.token,
    }
  } catch (error) {
		console.log(error);
    return {
      ok: false,
      message: 'No se pudo crear el usuario',
    }

  }
}
