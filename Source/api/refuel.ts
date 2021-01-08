import Axios from 'axios'
import {getServer} from '../Config'
import {getAuthToken} from '../Contexts/AuthProvider'
import {RefuelData} from '../Screens/Dashboard/types'

const BASE_URL = getServer()

export async function uploadRefuelLog(log: RefuelData): Promise<boolean> {
  try {
    console.log('log', log)
    const authToken = getAuthToken()
    if (!authToken) throw new Error('authToken Missing!')

    const URL = `${BASE_URL}/api/refuellog`
    const result = await Axios.post(URL, log, {
      headers: {'x-auth-token': authToken},
    })

    if (result.status !== 201) throw new Error('201_NOT_CREATED')
    return true
  } catch (error) {
    console.info('ERROR_IN_uploadRefuelLog', error.response.data)
    return false
  }
}
