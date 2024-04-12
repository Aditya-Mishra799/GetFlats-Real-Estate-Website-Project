import React from 'react'
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import contactImage from "../../public/contact.png"
const Contact = () => {
  return (
    <div className='border border-black m-2 flex flex-col gap-3'>
      <div className='overflow-hidden'>
        <img src={contactImage.src} alt="contact-img" className='w-[100%] h-[40vh] md:h-[70vh] hover:scale-105 transition-all duration-500' />
      </div>
      <div className='p-2 flex flex-col items-center gap-5'>
        <div className='font-bold flex flex-col justify-center items-center gap-1'>
          <h1 className='text-[#ff6f61] text-4xl p-1'>Contact Us</h1>
          <p className='text-white bg-[#ff6f61] text-[1.2rem] md:text-[2rem] w-[fit-content] p-2 rounded-xl'>We are always available to help you</p>
        </div>
        <div className='w-[90%] flex flex-col md:flex-row gap-3'>
          <div className='w-[100%] md:w-[55%] bg-[#ff6f61] p-4 rounded-md flex flex-col gap-4 '>
            <input type="text" name="" id="" placeholder='Enter Your Name...' className='w-[80%] rounded-xl h-[2.5rem] p-2' />
            <input type="email" name="" id="" placeholder='Enter Your Email...' className='w-[80%] rounded-xl h-[2.5rem] p-2' />
            <textarea name="" id="" cols="20" rows="10" placeholder='Enter Message...' className='w-[80%] rounded-xl p-2'></textarea>
            <button className='bg-white p-2 w-[30%] capitalize text-[#ff6f61] text-xl rounded-sm'>Send</button>
          </div>
          <div className='w-[100%] md:w-[40%] flex flex-col gap-5'>
            <h3 className='text-[#ff6f61] text-xl font-bold'>Contact Details</h3>
            <div className='p-2 rounded-lg border border-[#ff6f61]'>
              <p className='font-bold text-[1.4rem] '>Aditya Mishra</p>
              <div className='flex flex-row gap-2 items-center'>
                <i><FaPhone/></i>
                <p>9326293287</p>
              </div>
              <div className='flex flex-row gap-2 items-center'>
               <i><MdEmail/></i>
                <p>adityamishra@eng.rizvi.edu.in</p>
              </div>
            </div>
            <div className='p-2 rounded-lg border border-[#ff6f61]'>
              <p className='font-bold text-[1.4rem] '>Rohitkumar Pandey</p>
              <div className='flex flex-row gap-2 items-center'>
                <i><FaPhone/></i>
                <p>8108153488</p>
              </div>
               <div className='flex flex-row gap-2 items-center'>
            <i><MdEmail/></i>
                <p>rohitpandey10503@eng.rizvi.edu.in</p>
              </div>
            </div>
             <div className='p-2 rounded-lg border border-[#ff6f61]'>
              <p className='font-bold text-[1.4rem] '>Didar Abbas Shaikh</p>
              <div className='flex flex-row gap-2 items-center'>
                <i><FaPhone/></i>
                <p>7039662051</p>
              </div>
               <div className='flex flex-row gap-2 items-center'>
               <i><MdEmail/></i>
                <p>didarabbas@eng.rizvi.edu.in</p>
              </div>
            </div>
             <div className='p-2 rounded-lg border border-[#ff6f61]'>
              <p className='font-bold text-[1.4rem] '>Ahsan Ansari</p>
              <div className='flex flex-row gap-2 items-center'>
               <i><FaPhone/></i>
                <p>9324122378</p>
              </div>
               <div className='flex flex-row gap-2 items-center'>
                <i><MdEmail/></i>
                <p>ahsanansari2026@eng.rizvi.edu.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
