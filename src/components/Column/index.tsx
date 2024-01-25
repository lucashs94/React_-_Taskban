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
          onMouseEnter={ () => setIsHovered(true)}
          onMouseLeave={ () => setIsHovered(false)}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={`flex flex-col w-[300px] min-h-[50px] py-[19px] px-[12px] m-4 bg-card-gray rounded-xxl shadow-3xl`}
        >
          <div className="flex justify-between">
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