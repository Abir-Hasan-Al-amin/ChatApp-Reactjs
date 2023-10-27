import React from 'react'
import {BsUpload,BsSend} from 'react-icons/bs'
import dog from '../assets/dog1.jpg'
function Msg() {
    return (
        <div className='h-full w-full lg:w-[700px] lg:h-[90%] lg:rounded-xl bg-[#ABBCEA] flex flex-col'>
        <div className='flex p-4 my-5 lg:p-3 gap-5'>
            <img src={dog} className='md:ml-10 w-12 h-12 rounded-full'/>
            <p className=' font-medium text-3xl md:text-4xl '>Dog</p>
        </div>
        <div className='flex-1 rounded-t-xl  lg:rounded-xl flex flex-col'>
            <div className=' bg-[#FFFFFF] h-20 flex-1 rounded-t-xl'></div>
            <div className=' flex items-center gap-4 p-3 bg-[#8EACCD]  lg:rounded-b-xl justify-around'>
                <button><BsUpload className='w-6 h-6 lg:w-8 lg:h-8'/></button>
                <input className=' font-medium md:text-xl w-[80%] h-10 rounded-full outline-none p-3 shadow-sm'/>
                <button><BsSend className='w-6 h-6 lg:w-8 lg:h-8'/></button>
            </div>
        </div>
        </div>
    )
}

export default Msg