import React from 'react'
import {AuthProvider} from '../Contexts/AuthProvider'
import Providers from './Providers'

const InitialProvider = (): JSX.Element => {
  return (
    <AuthProvider>
      <Providers />
    </AuthProvider>
  )
}

export default InitialProvider
