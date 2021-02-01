import Axios from 'axios'
import {getServer} from '../Config'
import {getAuthToken} from '../Contexts/AuthProvider'
import {RefuelLog} from '../Types'

const BASE_URL = getServer()

export async function addCloudRefuelLog(log: RefuelLog): Promise<any> {
  const uploadableLog: any = {
    _id: log._id,
    vehicleId: log.vehicleId,
    odo: log.odo,
    quantity: log.quantity,
    date: log.date,
    unitCost: log.unitCost,
    totalCost: log.totalCost,
    location: log.location,
    images: log.images,
  }
  try {
    const authToken = getAuthToken()
    if (!authToken) throw new Error('authToken Missing!')

    const URL = `${BASE_URL}/api/refuellog`
    const result = await Axios.post(URL, uploadableLog, {
      headers: {'x-auth-token': authToken},
    })

    if (result.status !== 201) throw new Error('201_NOT_CREATED')
    return console.info('REFUEL_LOG_UPLOADED')
  } catch (error) {
    return console.info('ERROR_IN_addCloudRefuelLog', error.response.data)
  }
}

export async function removeCloudRefuelLog(log: any): Promise<any> {
  try {
    const authToken = getAuthToken()
    if (!authToken) throw new Error('authToken Missing!')
    const URL = `${BASE_URL}/api/refuellog/${log.vehicleId}/${log._id}`
    const result = await Axios.delete(URL, {
      headers: {'x-auth-token': authToken},
    })
    if (result.status !== 200) throw new Error('201_NOT_CREATED')
    return console.info('REMOVED_REFUEL_LOG_FROM_SERVER')
  } catch (error) {
    return console.info('ERROR_IN_removeCloudRefuelLog', error.response.data)
  }
}
