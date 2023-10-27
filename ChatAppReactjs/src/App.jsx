import React from "react"
import {Route, BrowserRouter, Routes } from "react-router-dom";
import All from './components/All'
function App() {
  return (
    <div className=" h-screen bg-[#27374D] flex justify-center items-center">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<All.SignIn/> }/>
            <Route path="/SignUp" element={<All.SignUp/> }/>
            <Route path="/Chat" element={<All.Chat/> }/>
            <Route path="/Msg" element={<All.Msg/> }/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
