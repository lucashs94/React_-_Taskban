import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { DataContextProvider } from './contexts/DataContext.tsx'
import Routes from './routes/index.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <DataContextProvider>
      <Routes />
    </DataContextProvider>
    
  </React.StrictMode>,
)
