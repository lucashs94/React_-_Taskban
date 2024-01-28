import Loading from "../components/Loading"
import { useDataContext } from "../contexts/DataContext"
import AppRoutes from "./app.routes"


export default function Routes(){

  const { data } = useDataContext()

  return(
    <>
      {data.length > 0 ? <AppRoutes/> : <Loading />}
    </>
  )
}