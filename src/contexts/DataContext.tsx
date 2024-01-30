import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"

import { KanbanProps, TaskProps } from "../types"
import { getAllLocalData, initialFill, removeCard, saveNewCard, setAllLocalData } from "../services/localStorage"
import { Bounce, toast } from "react-toastify"


type ProviderProps = {
  data: KanbanProps
  setData: Dispatch<SetStateAction<KanbanProps>>
  createCard: (Task: TaskProps) => void
  deleteCard: (id: string, col: number) => void
  saveData: (Data: KanbanProps) => void
}

const DataContext = createContext({} as ProviderProps)


export function DataContextProvider({ children }: { children: ReactNode }){

  const [data, setData] = useState<KanbanProps>([])


  function createCard(Task: TaskProps) {
    const newData = saveNewCard(Task)

    if(newData){
      setData(newData)

      toast.success('Tarefa criada com sucesso!', 
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
    }
  }


  function deleteCard(taskId: string, colIndex: number){
    const newData = removeCard(taskId, colIndex)

    if(newData){
      setData(newData)

      toast.error('A tarefa foi excluida!', 
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
    }
  }


  function saveData(newData: KanbanProps){
    setAllLocalData(newData)
    setData(newData)
  }


  useEffect(() => {

    initialFill()
    const savedData = getAllLocalData()
    savedData && setData(savedData)

  }, [])


  return(
    <DataContext.Provider
      value={{
        data,
        setData,
        createCard,
        deleteCard,
        saveData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}


export function useDataContext(){
  return useContext(DataContext)
}