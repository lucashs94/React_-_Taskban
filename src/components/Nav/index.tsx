import { useLocation } from "react-router-dom"
import MenuItem from "../MenuItem"


export default function Nav(){

  const { pathname } = useLocation()

  return(
    <nav className='block w-[220px] h-screen bg-white pt-[56px] items-center'>
        
        <section className="font-primary_title font-bold text-4xl text-primary-purple text-center">
          TASKBAN
        </section>

        <section className="flex flex-1 flex-col pt-[57px] px-[33px] gap-[30px]">

          <MenuItem path="/" name="Quadro" iconName="LayoutTemplate" selected={pathname === '/'} />
          <MenuItem path="/list" name="Lista" iconName="CalendarRange" selected={pathname === '/list'}/>
          <MenuItem path="/timeline" name="Timeline" iconName="List" selected={pathname === '/timeline'}/>
          <MenuItem path="/calendar" name="Calendário" iconName="CalendarRange" selected={pathname === '/calendar'}/>
          
        </section>

      </nav>
  )
}