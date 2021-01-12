import Axios from 'axios'
import {getServer} from '../Config'
import {getAuthToken} from '../Contexts/AuthProvider'
import {RefuelLog} from '../Screens/Dashboard/types'

const BASE_URL = getServer()

export async function uploadRefuelLog(log: RefuelLog): Promise<any> {
  console.log('refuel log', log)

  try {
    const authToken = getAuthToken()
    console.log('###############################3authToken', authToken)

    if (!authToken) throw new Error('authToken Missing!')

    const URL = `${BASE_URL}/api/refuellog`
    const result = await Axios.post(URL, log, {
      headers: {'x-auth-token': authToken},
    })

    if (result.status !== 201) throw new Error('201_NOT_CREATED')
    return console.info('REFUEL_LOG_UPLOADED')
  } catch (error) {
    return console.info('ERROR_IN_uploadRefuelLog', error.response.data)
  }
}

export async function removeCloudRefuelLog(log: RefuelLog): Promise<any> {
  try {
    const authToken = getAuthToken()
    if (!authToken) throw new Error('authToken Missing!')
    const URL = `${BASE_URL}/api/refuellog/:${log._id}`
    const result = await Axios.delete(URL, {
      headers: {'x-auth-token': authToken},
    })
    if (result.status !== 200) throw new Error('201_NOT_CREATED')
    return console.info('REMOVED_REFUEL_LOG_FROM_SERVER')
  } catch (error) {
    return console.info('ERROR_IN_removeCloudRefuelLog', error.message)
  }
}
