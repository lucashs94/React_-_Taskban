import { useEffect, useState } from "react"
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd"

import { KanbanProps, TaskProps } from "./types"
import { getAllLocalData, saveNewCard, setAllLocalData } from "./services/localStorage"

import Nav from "./components/Nav"
import Header from "./components/Header"
import Modal from "./components/Modal"
import Column from "./components/Column"



export default function App() {

  const [data, setData] = useState<KanbanProps>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)


  const handleOpenModal = () => {
    setModalIsOpen(true)
  }
  
  
  const handleCloseModal = () => {
    setModalIsOpen(false)
  }


  const handleNewCard = (newTask: TaskProps) => {
    
    const newData = saveNewCard(newTask)

    if(newData){
      setData(newData)
    }
  }


  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    
    if(result.type === 'COLUMN') {
      
      const { source, destination } = result
      const dataSource = data

      const [removed] = dataSource.splice(source.index, 1)
      dataSource.splice(destination.index, 0, removed)

      const newData = dataSource
      setAllLocalData(newData)
      setData(newData)
    }

    if(result.type === 'CARD'){

      const { source, destination } = result
      const sourceColumn = data.find( col => col.id === source.droppableId )
      const destinationColumn = data.find( col => col.id === destination.droppableId )

      if(!sourceColumn || !destinationColumn) return

      if(source.droppableId !== destination.droppableId){

        const newSourceTasks = sourceColumn.tasks
        const [removed] = newSourceTasks.splice(source.index, 1)
    
        const newDestinationTasks = destinationColumn.tasks
        newDestinationTasks.splice(destination.index, 0, removed)

        const newData = [
          ...data,
          { ...sourceColumn, tasks: newSourceTasks},
          { ...destinationColumn, tasks: newDestinationTasks},
        ]

        setData(newData)

      }else{

        const newSourceTasks = sourceColumn.tasks
        const [removed] = newSourceTasks.splice(source.index, 1)

        newSourceTasks.splice(destination.index, 0, removed)

        const newData = [
          ...data,
          { ...sourceColumn, tasks: newSourceTasks }
        ]

        setData(newData)
      }
    }
  }


  useEffect(() => {

    const localData = getAllLocalData()
    localData && setData(localData)

  }, [])


  return (
    <div className='w-screen h-screen flex'>

      <Nav/>

      <main className='flex flex-1 flex-col bg-primary-gray'>

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
                className="flex flex-1 px-[30px] pt-[30px]"
              >
                {Object.values(data).map((column, index) => (
                  <div key={column.id}>
                    <Column column={column} index={index}/>
                  </div>
                ))}

                {/* <div className="flex items-center min-w-[300px] h-[50px] py-[29px] px-[12px] m-4 gap-2 bg-card-gray rounded-xxl shadow-3xl">
                  <PlusCircle color="gray"/>
                  <h2 className="text-dark-gray font-bold">
                    New Column
                  </h2>
                </div> */}

                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext>
      
      </main>

      <Modal isOpen={modalIsOpen} onClose={handleCloseModal} onSend={handleNewCard}/>

    </div>
  )
}