import { BrowserRouter, Route, Routes } from "react-router-dom"
import List from "../screens/List"
import Timeline from "../screens/Timeline"
import Calendar from "../screens/Calendar"
import App from "../App"


export default function AppRoutes(){
  return(
    <BrowserRouter>

      <Routes>

        <Route 
          path="/"
          element={<App/>}
        />

        <Route 
          path="/list"
          element={<List/>}
        />

        <Route 
          path="/timeline"
          element={<Timeline/>}
        />

        <Route 
          path="/calendar"
          element={<Calendar/>}
        />

      </Routes>
      
    </BrowserRouter>
  )
}