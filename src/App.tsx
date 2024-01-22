import { useState } from "react"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"

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
      desc: 'Mg iashaus hauihs uiahs uaihs uiahsuiahsuiahsiahsiuahsu ahsiuahsiuahisuahsiuahsuih',
      date: '12/01/2024',
      priority: 'HIGH'
    },
    {
      id: '2', 
      title:'Tarefa 2', 
      desc: 'Mg iashaus hauihs uiahs uaihs uiahsuiahsuiahsiahsiuahsu ahsiuahsiuahisuahsiuahsuih',
      date: '13/01/2024',
      priority: 'MEDIUM'
    },
  ] },
  inProgress: { id: 'inProgress', title: 'Em Progresso', tasks: [
    {
      id: '3', 
      title:'Tarefa 3', 
      desc: 'Mg iashaus hauihs uiahs uaihs uiahsuiahsuiahsiahsiuahsu ahsiuahsiuahisuahsiuahsuih',
      date: '13/01/2024',
      priority: 'LOW'
    },
  ]},
  done: { id: 'done', title: 'Concluído', tasks: [] },
}


function App() {

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


  return (
    <div className='w-screen h-screen flex'>

      <Nav/>

      <main className='flex flex-1 flex-col bg-primary-gray'>

        <Header openModal={handleOpenModal}/>

        <section className="flex px-[80px] pt-[60px] gap-8">
          <DragDropContext 
            onDragEnd={onDragEnd}
          >
            {Object.values(data).map((column) => (
              <div key={column.id}>

                <Column column={column}/>

              </div>
            ))}
          </DragDropContext>
        </section>

      </main>

      <Modal isOpen={modalIsOpen} onClose={handleCloseModal} onSend={handleSubmit}/>

    </div>
  )
}

export default App