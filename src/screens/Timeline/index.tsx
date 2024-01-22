import Nav from "../../components/Nav";


export default function Timeline(){
  return(
    <div className='w-screen h-screen flex'>

      <Nav/>

      <main className='flex flex-1 flex-col bg-primary-gray'>

        <header className="flex w-full h-[90px] bg-primary-purple px-[90px] items-center justify-end"/>

        <section className="flex flex-1 items-center justify-center">
          <span className="text-primary-purple text-[50px] font-bold">
            TIMELINE PAGE
          </span>
        </section>

      </main>

    </div>
  )
}