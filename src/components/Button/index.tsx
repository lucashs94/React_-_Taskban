

type ButtonProps = {
  text: string
  type?: 'CANCEL' | 'SUBMIT'
  onCall?: () => void
}

export default function Button({ text, type = 'SUBMIT', onCall }: ButtonProps){

  return(
    <button 
      onClick={ onCall }
      className={
        `w-[180px] pt-[10px] pb-[10px] rounded-3xl
        ${type === 'CANCEL' 
          ? 'bg-transparent border-2 border-primary-red text-primary-red' 
          : 'bg-primary-purple text-white'
        }
        font-semibold text-[14px] text-center`
      }
    >
      {text}
    </button>
  )
}