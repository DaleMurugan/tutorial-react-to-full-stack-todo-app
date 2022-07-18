import { createContext, useContext } from "react"
import {  UserContextInterface } from "../lib/types"

export const UserContext = createContext<UserContextInterface>({user: {}, setUser: () => {}})
export const useGlobalUserContext = () => useContext(UserContext)

