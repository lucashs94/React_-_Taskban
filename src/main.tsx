import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'
import Routes from './routes/index.tsx'
import { DataContextProvider } from './contexts/DataContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <DataContextProvider>

      <Routes />
      <ToastContainer />
      
    </DataContextProvider>
    
  </React.StrictMode>,
)
