import {apiSignInUser, apiSignUpUser, Credentials} from '../../api/auth'
import {User} from '../../Contexts/AuthProvider'
import {dbAddUser, dbRemoveUser} from '../../Database/jobs'

export async function signupUserToDbAndCloud(
  user: User,
  login: (arg0: User) => void,
): Promise<any> {
  if (!user) return null
  try {
    await dbAddUser(user)
    const result: any = await apiSignUpUser(user)
    if (!result.token) {
      await dbRemoveUser(user)
      throw new Error('NO_TOKEN')
    }
    user.authToken = result.token
    console.log('###################in signup', user)

    login(user)
    return user._id
  } catch (error) {
    return console.warn('Could not add user to db', error)
  }
}

export async function signinUserFromCloudToDb(
  credentials: Credentials,
  login: (arg0: User) => void,
): Promise<boolean> {
  if (!credentials) return false
  try {
    const result = await apiSignInUser(credentials)
    if (!result) throw new Error('NO_TOKEN')

    const user: User = {
      _id: result._id,
      callsign: result.callsign,
      email: credentials.email,
      avatar: result.avatar || '',
      authToken: result.token,
    }
    await dbAddUser(user)
    login(user)
    return true
  } catch (error) {
    console.warn('Couldnt Signin user!', error)
    return false
  }
}
