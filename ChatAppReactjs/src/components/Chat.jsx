import React from 'react'
import dog from '../assets/dog1.jpg'
import {AiOutlineSearch} from 'react-icons/ai'
function Chat() {
  return (
    <div className='h-full w-full lg:w-[700px] lg:h-[90%] lg:rounded-xl bg-red-400 flex flex-col'>
    <div className='flex justify-between p-4 my-5 lg:p-3'>
      <p className=' font-bold text-4xl md:text-5xl md:ml-10 '>Messages</p>
      <button className=' md:mr-10'><AiOutlineSearch className='w-7 h-7 lg:w-8 lg:h-8'/></button>
    </div>
    <div className=' bg-[#A6E3E9] flex-1 rounded-t-xl  lg:rounded-xl'>
      <ul className='p-3'>
        <li className=' flex items-center gap-3 p-3 bg-[#CBF1F5] rounded-3xl'>
            <img src={dog} className=' w-12 h-12 rounded-full'/>
            <p className=' font-medium md:text-xl'>Dog</p>
        </li>
      </ul>
    </div>
    </div>
  )
}

export default Chat