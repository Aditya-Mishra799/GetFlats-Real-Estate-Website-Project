import React, { useState } from 'react'
import EnquiryCard from './EnquiryCard'
import FetchAndDisplayCards from './FetchAndDisplayCards'
const EnquiryPanel = () => {
    //select menu with options for different types of enquiries
    //two options are enquiries made by the user (i.e. sent by the user) and enquiries received by the user for his listings
    //on slecting one of the option we load the specific type of enquiries
    //for this we use FetchAndDisplayCards and pass specific api 
    const [type, setType] = useState('sent')
    const hnadleChange = (e)=>{
      e.preventDefault()
      const type = e.target.value
      setType(type)
    }
  const DisplayPanel = (
    <FetchAndDisplayCards type={type} apiEndpoint={`api/enquiry/view?type=${type}`} CardComponet = {EnquiryCard}/>
  )

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        {/* enquiry loader selction component */}
        {/* custom select tag code */}
           <div className='flex flex-col self-start '>
               <label htmlFor="enquiry-type" className='mb-2 font-bold'>Select Enquiry Type</label>
               <select 
               value={type} 
               onChange={hnadleChange}
               className=' border  border-active-orange px-2 py-1 text-md font-semibold rounded-md focus:outline-0' >
                <option value={'sent'}>Sent</option>
                <option value={'received'}>Received</option>
               </select>
           </div>
           {DisplayPanel}
      
    </div>
  )
}

export default EnquiryPanel
