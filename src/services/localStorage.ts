import { initialData } from "../initialData"
import { KanbanProps, TaskProps } from "../types"

const LOCAL_KEY = "@taskban:items"


export const getAllLocalData = () => {
  const items = localStorage.getItem(LOCAL_KEY)

  if(!items) return

  return JSON.parse(items) as KanbanProps
}


export const setAllLocalData = (data: KanbanProps) => {
  
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
    
  } catch (err) {
    console.log(err)
    
  }
}


export const saveNewCard = (task: TaskProps) => {

  const savedData = getAllLocalData()

  if(savedData){
    const col = savedData.find( col => col.id === 'todo' )
    
    if(col){
      col.tasks.push(task)
      setAllLocalData(savedData)
      return savedData
    }
  }
}


export const removeCard = (taskId: string) => {

  const itemsSaved = getAllLocalData()

  if(itemsSaved){
    const filtered = itemsSaved.filter( col => {
      col.tasks.map( task => task.id !== taskId)
    })

    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered))
      return filtered
      
    } catch (error) {
      console.log(error)
      return null
    }
    
  } else{
    return null
  }

}


export const initialFill = () => {
  const itemsSaved = getAllLocalData()

  if(!itemsSaved){
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(initialData))
      
    } catch (error) {
      console.log(error)
      
    }finally{

      return
    }
  }

  return
}
