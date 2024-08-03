import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { TreesProvider } from './components/providers/TreesProvider.tsx'
// import './app/App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TreesProvider>
      <App />
    </TreesProvider>
  </React.StrictMode>,
)
