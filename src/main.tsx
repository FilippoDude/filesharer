import React from 'react'
import ReactDOM from 'react-dom/client'

// Used for handling paths with the url
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// This only needs to be imported here
import './index.css'

// Here we import the needed components
import MainPage from "./pages/main/mainPage.tsx"

// Importing context for potentially sharing variables and things to every component
import {AppContextProvider} from './contextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Over here we encapsulate eveything in the BrowserRouter (needed for handling routes) 
  // We encapsulate the Routes in the AppContextProvider since we may want some values to be shared with every component

  // For each path we define the path and the element it "points" to
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
              <Route path='/' element={<MainPage/>}></Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
