import { icons } from 'lucide-react'
import { Link } from 'react-router-dom'


type IconsProps = {
  path: string
  name: string
  iconName: string
  selected?: boolean
}


export default function MenuItem({ path, name, iconName, selected = false }:IconsProps){

  const LucideIcon = icons[iconName]

  return(
    <Link to={path} className='flex gap-5 items-center'>

      <LucideIcon color={selected ? '#48409E' : '#6F6F6F'} size={20} fill={selected ? '#48409E' : 'transparent'} />
      
      <h2 
        className={`
          ${selected ? 'text-primary-purple font-semibold' : 'text-dark-gray' } text-[16px]
          hover:transition-all hover:duration-[800ms] hover:translate-x-2
        `}
      >
        {name}
      </h2>

    </Link>
  )
}