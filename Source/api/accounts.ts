import Axios from 'axios'
import {getServer} from '../Config'
import {getAuthToken, getAuthUserId} from '../Contexts/AuthProvider'

const BASE_URL = getServer()

export async function apiResetPassword(
  currentPassword: string,
  newPassword: string,
): Promise<any> {
  const authToken = getAuthToken()
  const userId = getAuthUserId()
  const URL = `${BASE_URL}/api/updatePassword/${userId}`
  await Axios.post(
    URL,
    {currentPassword, newPassword},
    {headers: {'x-auth-token': authToken}},
  )
}
