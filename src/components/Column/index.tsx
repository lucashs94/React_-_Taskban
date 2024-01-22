import { Droppable } from "@hello-pangea/dnd"

import { ColunmProps } from "../../types"

import Card from "../Card"


type IColumnProps = {
  column: ColunmProps
}

export default function Column({ column }: IColumnProps){

  return(
    <section
      className={`flex flex-col w-[300px] min-h-[50px] bg-card-gray rounded-xxl shadow-3xl py-[19px] px-[12px]`}
    >
      <h2 className="text-dark-gray font-bold">
        {column.title}
      </h2>

      <Droppable key={column.id} droppableId={column.id}>
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
  )
}