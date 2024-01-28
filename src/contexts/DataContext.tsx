import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { KanbanProps } from "../types"
import { getAllLocalData, initialFill } from "../services/localStorage"


interface ChildrenProps {
  children: ReactNode
}

type ProviderProps = {
  data: KanbanProps
  setData: Dispatch<SetStateAction<KanbanProps>>
}

const DataContext = createContext({} as ProviderProps)


export function DataContextProvider({ children }: ChildrenProps){

  const [data, setData] = useState<KanbanProps>([])



  useEffect(() => {

    console.log('passouaqui');
    
    initialFill()
    const savedData = getAllLocalData()
    savedData && setData(savedData)

  }, [setData])


  return(
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}


export function useDataContext(){
  return useContext(DataContext)
}