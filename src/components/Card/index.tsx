import { useState } from "react"
import { Draggable } from "@hello-pangea/dnd"
import { Clock, Trash } from "lucide-react"
import { isBefore, isToday, parse } from "date-fns"
import { ptBR } from "date-fns/locale"

import { TaskProps } from "../../types"
import { useDataContext } from "../../contexts/DataContext"

import Box from "../Box"


type Props = {
  task: TaskProps
  index: number
  colIndex: number
}


export default function Card({ task, index, colIndex }: Props){

  const { deleteCard } = useDataContext()

  const [isHovered, setIsHovered] = useState(false)

  const parsedDate = parse(task.date, 'dd/MM/yyyy', new Date(), { locale: ptBR })
  const IsToday = isToday(parsedDate)
  const IsBefore = isBefore(parsedDate, new Date())
  const delayed = IsBefore || IsToday

  
  function handleDeleteCard(){
    deleteCard(task.id, colIndex)
  }


  return(
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col justify-between w-full h-[150px] bg-white mb-4 rounded-xxl p-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          <div className="flex items-center justify-between">
            <h2 className="text-dark-gray font-bold text-[18px] line-clamp-1 pr-2">
              {task.title}
            </h2>

            {isHovered && (
              <button 
                onClick={ () => handleDeleteCard() }
                className="flex text-red-600"
              >
                <Trash size={20}/>
              </button>
            )}
          </div>

          <p className="w-full text-dark-gray text-[12px] line-clamp-2">
            {task.desc}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className={`${delayed ? 'text-red-500' : 'text-black'}`}/>

              <span 
                className={`${delayed ? 'text-red-500' : 'text-black' } text-[14px]`}
              >
                {task.date}
              </span>
            </div>

            <Box text={task.priority} state={task.priority} onCall={() => {}}/>
          </div>

        </div>
      )}
    </Draggable>
  )
}