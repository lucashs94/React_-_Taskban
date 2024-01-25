import { KanbanProps } from "./types";


export const initialData: KanbanProps = [
  { 
    id: 'todo', 
    title: 'A Fazer', 
    tasks: [] 
  },
  { 
    id: 'inProgress', 
    title: 'Em Progresso', 
    tasks: []
  },
  { 
    id: 'done', 
    title: 'Concluído', 
    tasks: [] 
  },
]