import AppRoutes from "./app.routes"
import { useDataContext } from "../contexts/DataContext"
import Loading from "../components/Loading"


export default function Routes(){

  const { data } = useDataContext()

  return(
    <>
      {data.length > 0 ? <AppRoutes/> : <Loading />}
    </>
  )
}