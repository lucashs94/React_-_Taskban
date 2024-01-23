import { Plus } from "lucide-react"


type HeaderProps = {
  openModal: () => void
}

export default function Header({ openModal }:HeaderProps){
  return(
    <header className="flex w-full h-[70px] bg-primary-purple px-[50px] items-center justify-end">
      <button 
        onClick={openModal}
        className="flex items-center gap-1 py-2 px-3 bg-secondary-purple rounded-md font-primary_body font-medium text-md
        hover:bg-purple-500 hover:transition hover:ease-linear hover:duration-[200ms] hover:ring hover:ring-secondary-purple
        "
      >
        <Plus/>
        Novo Card
      </button>
    </header>
  )
}