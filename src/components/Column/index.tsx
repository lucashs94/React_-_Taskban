import { useState } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"

import { ColunmProps } from "../../types"

import Card from "../Card"
import { Trash } from "lucide-react"


type IColumnProps = {
  column: ColunmProps
  index: number
}

export default function Column({ column, index }: IColumnProps){

  const [isHovered, setIsHovered] = useState(false)


  return(
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <section
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={`flex flex-col w-[300px] min-h-[50px] m-4 bg-card-gray rounded-xxl shadow-3xl`}
        >
          <div 
            onMouseEnter={ () => setIsHovered(true)}
            onMouseLeave={ () => setIsHovered(false)}
            className="flex items-center justify-between px-[12px] p-[19px]"
          >
            <h2 className="text-dark-gray font-bold line-clamp-1">
              {column.title}
            </h2>
            
            {
              isHovered && (
                <button className="text-red-500 mr-1">
                  <Trash/>
                </button>
              )
            }
          </div>

          <Droppable 
            key={column.id} 
            droppableId={column.id}
            type="CARD"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className=" px-[12px]"
              >
                {column.tasks.map((task, index) => (
                  <Card key={task.id} index={index} task={task}/>
                ))}

                {provided.placeholder}  
              </div>
            )}
          </Droppable>
        </section>
      )}
    </Draggable>
  )
}