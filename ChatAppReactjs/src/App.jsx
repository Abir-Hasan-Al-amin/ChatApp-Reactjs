import React from "react"
import { Outlet } from "react-router-dom"
import All from './components/All'
function App() {
  return (
    <div className=" h-screen bg-[#71C9CE] flex justify-center items-center">
      {/* <Outlet/> */}
      {/* <All.SignIn/> */}
      {/* <All.SignUp/> */}
      {/* <All.Chat/> */}
      <All.Msg/>
    </div>
  )
}

export default App
