import { useEffect, useState, createContext, useContext } from "react";
import { data } from "./data";

export const SiteContext = createContext()

export const SiteContextProvider = ({children}) => {
    const [state, setState] = useState(null)

    useEffect(() => {
        setState(data);
    },[])

    return (
        <SiteContext.Provider value={{...state}}>
            {children}
        </SiteContext.Provider>
    )
}

export const useSiteContext = () => {
    const context = useContext(SiteContext)
    if(!context) {
        throw Error('useSiteContext must be used inside provider')
    }

    return context
}
