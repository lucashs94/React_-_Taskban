import { useState } from "react"
import { Draggable } from "@hello-pangea/dnd"
import { Clock, Trash } from "lucide-react"

import { TaskProps } from "../../types"
import { removeCard } from "../../services/localStorage"

import Box from "../Box"


type Props = {
  task: TaskProps
  index: number
  colIndex: number
}


export default function Card({ task, index, colIndex }: Props){

  const [isHovered, setIsHovered] = useState(false)

  
  function handleDeleteCard(taskId: string){
    const newData = removeCard(taskId, colIndex)

    newData && window.location.reload()
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
                onClick={ () => handleDeleteCard(task.id) }
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
              <Clock color="red"/>

              <span className="text-red-500 text-[14px]">
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