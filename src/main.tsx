import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import AppRoutes from './routes/index.tsx'
import { DataContextProvider } from './contexts/DataContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}

    <DataContextProvider>
      <AppRoutes />
    </DataContextProvider>
    
  </React.StrictMode>,
)
