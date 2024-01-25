
export type PriorityProps = 'HIGH' | 'MEDIUM' | 'LOW' | null

export type TaskProps = {
  id: string
  title: string
  desc: string
  date: string
  priority: PriorityProps
}

export type ColunmProps = {
  id: string
  title: string
  tasks: TaskProps[]
}

// export type KanbanProps = {
//   [key: string]: ColunmProps
// }

export type KanbanProps = ColunmProps[]