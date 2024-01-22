import { PriorityProps } from "../../types"


type Props = {
  text: PriorityProps
  state: string | null
  onCall: (arg: PriorityProps) => void
}

type ColorProps = {
  [key:string]: string
}

type ThemeObjectProps = {
  BG: ColorProps
  BORDER: ColorProps
  TEXT: ColorProps
}

const colorVariants: ThemeObjectProps = {
  BG: {
    RED: 'bg-red-500',
    YELLOW: 'bg-yellow-500',
    GREEN: 'bg-green-500',
  },
  BORDER: {
    RED: 'border-red-500',
    YELLOW: 'border-yellow-500',
    GREEN: 'border-green-500',
  },
  TEXT: {
    RED: 'text-red-500',
    YELLOW: 'text-yellow-500',
    GREEN: 'text-green-500',
  },
}

const colorType = {
  HIGH: 'RED',
  MEDIUM: 'YELLOW',
  LOW: 'GREEN',
}


export default function Box({ text, state, onCall }: Props){

  const color = text ? colorType[text] : ''

  return(
    <button
      onClick={ () => onCall(text) }
      className={`
        flex py-1 px-3 rounded-full border ${colorVariants.BORDER[color]}
        ${state === text ? colorVariants.BG[color] : `bg-transparent ${colorVariants.TEXT[color]}`}
      `}
    >

      <span className="text-[12px] uppercase font-bold">
        {text}
      </span>
      
    </button>
  )
}