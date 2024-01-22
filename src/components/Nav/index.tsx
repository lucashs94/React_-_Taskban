import MenuItem from "../MenuItem"


export default function Nav(){
  return(
    <nav className='block w-[220px] h-screen bg-white pt-[56px] items-center'>
        
        <section className="font-primary_title font-bold text-4xl text-primary-purple text-center">
          TASKBAN
        </section>

        <section className="flex flex-1 flex-col pt-[57px] px-[33px] gap-[30px]">

          <MenuItem name="Quadro" iconName="LayoutTemplate" selected  />
          <MenuItem name="Lista" iconName="CalendarRange" />
          <MenuItem name="Timeline" iconName="List" />
          <MenuItem name="Calendário" iconName="CalendarRange" />
          
        </section>

      </nav>
  )
}