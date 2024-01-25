import { useState } from "react"
import { Draggable } from "@hello-pangea/dnd"
import { Clock, Trash } from "lucide-react"

import { TaskProps } from "../../types"

import Box from "../Box"


type Props = {
  task: TaskProps
  index: number
  // onOpenModal: () => void
}


export default function Card({ task, index }: Props){

  const [isHovered, setIsHovered] = useState(false)


  return(
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col justify-between w-full h-[150px] bg-white mt-4 rounded-xxl p-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {isHovered && (
            <button className="flex items-center justify-center">
              <Trash />
            </button>
          )}

          <h2 className="text-dark-gray font-bold text-[18px] line-clamp-1">
            {task.title}
          </h2>

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