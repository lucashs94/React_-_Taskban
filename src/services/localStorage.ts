
const LOCAL_KEY = "@taskban:items"


export const getItems = () => {
  const items = localStorage.getItem(LOCAL_KEY)

  if(!items) return

  return JSON.parse(items)
}


export const saveItem = (item: any) => {
  
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(item))
    
  } catch (error) {
    console.log(error)
  }
}


export const removeItem = (data: any) => {

  const itemsSaved = getItems()

  const filtered = itemsSaved.filter( item => item !== data)

  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered))
    
  } catch (error) {
    console.log(error)
  }
}

