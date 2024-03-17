//This component will be used to show errors on our website and other notifications
import React, { useContext } from 'react'
import { createContext } from 'react'
const SnackBarContext = createContext()
export const useSnackBar = ()=>useContext(SnackBarContext)
export default SnackBarContext
