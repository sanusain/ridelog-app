import Axios from 'axios'
import {getServer} from '../Config'
import {User} from '../Contexts/AuthProvider'

export type Credentials = {email: string; password: string}

let BASE_URL = getServer()

export async function apiSignUpUser(newUser: User): Promise<any> {
  const URL = `${BASE_URL}/api/signup`
  try {
    const result = await Axios.post(URL, newUser)
    return result.data
  } catch (error) {
    return console.log('axios error', error)
  }
}

export async function apiSignInUser(
  userCredentials: Credentials,
): Promise<any> {
  const URL = `${BASE_URL}/api/signin`
  try {
    const result = await Axios.post(URL, userCredentials)
    return result.data
  } catch (error) {
    console.log('signup error', error)
    return {error}
  }
}
