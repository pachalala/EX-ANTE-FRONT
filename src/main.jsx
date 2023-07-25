import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {  GenContextProvider } from "./context/GenContext"; 
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GenContextProvider>
    <App />
  </GenContextProvider>
</React.StrictMode>
)
