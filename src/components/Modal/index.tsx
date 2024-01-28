import { useRef, useState } from "react"
import { createId } from '@paralleldrive/cuid2'

import Box from "../Box"
import Button from "../Button"
import { PriorityProps, TaskProps } from "../../types"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"


type ModalProps = {
  isOpen: boolean
  data?: TaskProps | null
  onClose: () => void
  onSend: (task: TaskProps) => void
}


export default function Modal({ isOpen, onClose, onSend }: ModalProps){

  const taskRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const [boxSelection, setBoxSelection]= useState<PriorityProps>(null)


  function handleBoxSelect(prioridade: PriorityProps){
    prioridade === boxSelection ? setBoxSelection(null) : setBoxSelection(prioridade)
  }


  function handleSend(){

    if(
      dateRef.current?.value.trim() === '' || 
      taskRef.current?.value.trim() === '' || 
      descRef.current?.value.trim() === ''
    ) return

    if(
      taskRef.current !== null && 
      descRef.current !== null && 
      dateRef.current !== null
    )
    {

      const data = {
        id: createId(),
        title: taskRef.current.value,
        desc: descRef.current.value,
        date: format(parse(dateRef.current.value, 'yyyy-MM-dd', new Date(), { locale: ptBR }), 'dd/MM/yyyy') || '',
        priority: boxSelection
      }

      onSend(data)

      taskRef.current.value = ''
      descRef.current.value = ''
      dateRef.current.value = ''
      setBoxSelection(null)

      onClose()
    }
  }

  // useEffect(() => {

  //   if(data){
  //     taskRef.current.value = data.title
  //     descRef.current.value = data.desc
  //     dateRef.current.value = data.date
  //     setBoxSelection(data.priority)
  //   }

  // }, [data])

  return(
    <>
      {
        isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div  
              onClick={onClose} 
              className="absolute inset-0 bg-gray-800 opacity-50"
            />
            <div className="relative z-50 w-[700px] bg-white px-10 py-9 rounded-xxl">
              
              <span className="text-primary-purple font-semibold text-2xl">
                Novo Card
              </span>

              <div className="relative mt-9">
                  <input 
                    ref={taskRef} 
                    id="task" 
                    type="text" 
                    placeholder=" " 
                    className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-primary-purple bg-transparent rounded-lg border-2 border-secondary-purple appearance-none focus:outline-none focus:ring-0 focus:border-secondary-purple peer" 
                  />
                  <label 
                    htmlFor="task" 
                    className="absolute text-md text-light-gray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-purple peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Task
                  </label>
              </div>

              <div className="relative mt-6">
                  <textarea
                    ref={descRef}
                    id="description" 
                    rows={4} 
                    placeholder=" "
                    className="block px-2.5 pb-2.5 pt-2 w-full text-lg text-primary-purple resize-none bg-transparent rounded-lg border-2 border-secondary-purple appearance-none focus:outline-none focus:ring-0 focus:border-secondary-purple peer" 
                  />
                  <label htmlFor="description" className="absolute text-md text-light-gray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-purple peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/4 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Descrição
                  </label>
              </div>

              
              <div className="flex mt-6 gap-8 justify-between">

                <div className="relative w-1/2">
                  <input 
                    ref={dateRef}
                    id="date" 
                    type="date" 
                    className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-primary-purple bg-transparent rounded-lg border-2 border-secondary-purple appearance-none focus:outline-none focus:ring-0 focus:border-secondary-purple peer" 
                    placeholder=""
                  />
                  <label htmlFor="date" className="absolute text-md text-light-gray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-purple peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Data Final
                  </label>
                </div>

                <div className="flex flex-col pb-1 justify-between">
                  <span className="text-primary-purple text-[14px]">
                    Prioridade
                  </span>

                  <div className="flex gap-2">
                    <Box text="HIGH" state={boxSelection} onCall={handleBoxSelect}/>
                    <Box text="MEDIUM" state={boxSelection} onCall={handleBoxSelect}/>
                    <Box text="LOW" state={boxSelection} onCall={handleBoxSelect}/>
                  </div>
                </div>

              </div>

              <div className="flex justify-end gap-5 mt-12">
                <Button text="CANCELAR" type="CANCEL" onCall={onClose}/>
                <Button text="CRIAR" onCall={handleSend}/>
              </div>

            </div>
          </div>
        )
      } 
    </>
  )
}