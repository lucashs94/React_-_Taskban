

type HeaderProps = {
  openModal: () => void
}

export default function Header({ openModal }:HeaderProps){
  return(
    <header className="flex w-full h-[90px] bg-primary-purple px-[90px] items-center justify-end">
      <button 
        onClick={openModal}
        className="p-3 bg-secondary-purple rounded-md font-primary_body font-medium text-lg
        hover:bg-purple-500 hover:transition hover:ease-linear hover:duration-[200ms] hover:ring hover:ring-secondary-purple
        "
      >
        + Novo Card
      </button>
    </header>
  )
}