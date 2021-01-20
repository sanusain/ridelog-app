import Axios from 'axios'
import {getServer} from '../Config'
import {getAuthToken} from '../Contexts/AuthProvider'
import {ServiceLog} from '../Types'

const BASE_URL = getServer()

export async function addCloudServiceLog(log: ServiceLog): Promise<any> {
  const uploadableLog: any = {
    _id: log._id,
    vehicleId: log.vehicleId,
    odo: log.odo,
    date: log.date,
    serviceCount: log.serviceCount,
    notes: log.notes,
    totalCost: log.totalCost,
    location: log.location,
    images: log.images,
  }
  try {
    const authToken = getAuthToken()
    if (!authToken) throw new Error('authToken Missing!')

    const URL = `${BASE_URL}/api/servicelog`
    const result = await Axios.post(URL, uploadableLog, {
      headers: {'x-auth-token': authToken},
    })

    if (result.status !== 201) throw new Error('201_NOT_CREATED')
    return console.info('SERVICE_LOG_UPLOADED')
  } catch (error) {
    return console.info('ERROR_IN_addCloudServiceLog', error.response.data)
  }
}

export async function removeCloudServiceLog(log: ServiceLog): Promise<any> {
  try {
    const authToken = getAuthToken()
    if (!authToken) throw new Error('authToken Missing!')
    const URL = `${BASE_URL}/api/servicelog/:${log.vehicleId}/:${log._id}`
    const result = await Axios.delete(URL, {
      headers: {'x-auth-token': authToken},
    })
    if (result.status !== 200) throw new Error('201_NOT_CREATED')
    return console.info('REMOVED_SERVICE_LOG_FROM_SERVER')
  } catch (error) {
    return console.info('ERROR_IN_removeCloudServiceLog', error.message)
  }
}
