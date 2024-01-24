import { useState } from "react"
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd"
import { PlusCircle } from "lucide-react"

import { KanbanProps, TaskProps } from "./types"

import Nav from "./components/Nav"
import Header from "./components/Header"
import Modal from "./components/Modal"
import Column from "./components/Column"


const initialData: KanbanProps = {
  todo: { id: 'todo', title: 'Por Fazer', tasks: [
    {
      id: '1', 
      title:'Tarefa 1', 
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ducimus voluptate magnam laborum',
      date: '12/01/2024',
      priority: 'HIGH'
    },
    {
      id: '2', 
      title:'Tarefa 2', 
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      date: '13/01/2024',
      priority: 'MEDIUM'
    },
  ] },
  inProgress: { id: 'inProgress', title: 'Em Progresso', tasks: [
    {
      id: '3', 
      title:'Tarefa 3', 
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ducimus voluptate magnam laborum',
      date: '13/01/2024',
      priority: 'LOW'
    },
  ]},
  done: { id: 'done', title: 'Concluído', tasks: [] },
}


export default function App() {

  const [data, setData] = useState<KanbanProps>(initialData)
  const [modalIsOpen, setModalIsOpen] = useState(false)


  const handleOpenModal = () => {
    setModalIsOpen(true)
  }
  
  
  const handleCloseModal = () => {
    setModalIsOpen(false)
  }


  const handleSubmit = (newTask: TaskProps) => {
    const initialColumn = data['todo']
    const newTaskObj = Array.from(initialColumn.tasks)

    newTaskObj.unshift(newTask)

    const newData = {
      ...data,
      ['todo']: { ...initialColumn, tasks: newTaskObj },
    }
    
    setData(newData)
  }


  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    if(result.type === 'COLUMN') {
      
      const { source, destination } = result
      const dataSource = Object.values(data)

      const [removed] = dataSource.splice(source.index, 1)
      dataSource.splice(destination.index, 0, removed)

      const newData = dataSource.reduce((acc,item) => {
        acc[item.id] = item
        return acc
      }, {} as KanbanProps)

      setData(newData)
    }

    if(result.type === 'CARD'){

      const { source, destination } = result
      const sourceColumn = data[source.droppableId]
      const destinationColumn = data[destination.droppableId]

      if(source.droppableId !== destination.droppableId){

        const newSourceTasks = Array.from(sourceColumn.tasks)
        const [removed] = newSourceTasks.splice(source.index, 1)
    
        const newDestinationTasks = Array.from(destinationColumn.tasks)
        newDestinationTasks.splice(destination.index, 0, removed)
        
        const newData = {
          ...data,
          [source.droppableId]: { ...sourceColumn, tasks: newSourceTasks },
          [destination.droppableId]: { ...destinationColumn, tasks: newDestinationTasks },
        }
        
        setData(newData)

      }else{

        const newSourceTasks = Array.from(sourceColumn.tasks)
        const [removed] = newSourceTasks.splice(source.index, 1)
        newSourceTasks.splice(destination.index, 0, removed)

        const newData = {
          ...data,
          [source.droppableId]: { ...sourceColumn, tasks: newSourceTasks }
        }

        setData(newData)
      }
    }
  }


  return (
    <div className='w-screen h-screen flex'>

      <Nav/>

      <main className='flex flex-1 flex-col bg-primary-gray  overflow-x-auto'>

        <Header openModal={handleOpenModal}/>
        
        <DragDropContext 
          onDragEnd={onDragEnd}
        >
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
          >
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-1 px-[30px] pt-[30px] overflow-x-auto"
              >
                {Object.values(data).map((column, index) => (
                  <div key={column.id}>
                    <Column column={column} index={index}/>
                  </div>
                ))}

                <div className="flex items-center min-w-[300px] h-[50px] py-[29px] px-[12px] m-4 gap-2 bg-card-gray rounded-xxl shadow-3xl">
                  <PlusCircle color="gray"/>
                  <h2 className="text-dark-gray font-bold">
                    New Column
                  </h2>
                </div>

                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext>
      </main>

      <Modal isOpen={modalIsOpen} onClose={handleCloseModal} onSend={handleSubmit}/>

    </div>
  )
}