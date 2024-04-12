'use client'
import ChatBot from 'react-simple-chatbot'
import { LuBot } from "react-icons/lu";
import { useState } from 'react';

const Chatbot = () => {
    const [amenities,setAmenities]=useState(["1"])

    const step=[
        {
            id:'Greet',
            message:"Hello! GetFlats.com's bot here and I warmly welcome you to our website. I am here to help you find your dream house. I will ensure that you will a great experience like never before",
            trigger:'Ask name'
        },
        {
            id:'Ask name',
            message:'Tell me your name',
            trigger:'room'
        },
        
        {
            id:'waiting1',
            user:true,
            trigger:'name'
        },
        {
            id:'name',
            message:'Hello {previousValue}. Can you provide your contact number so that I can reach you?',
            trigger:'waiting2'
        },
        {
            id:'waiting2',
            user:true,
            trigger:'number'
        },
        {
            id:'number',
            message:'Thank You for providing {previousValue}. Now I can contact you about new houses',
            trigger:'property type'
        },
        {
            id:'property type',
            message:'Please select property type!!',
            trigger:'types'
        },
        {
            id:'types',
            options:[
                {value:'Buy', label:'Buy',trigger:'buy'},
                {value:'Rent',label:'Rent',trigger:'buy'},
            ],
        },
        {
           id:'buy',
           message:'Great! So you want to {previousValue} a property. Now, Please select Property Type',
           trigger:'house type'
        },
        {
            id:'house type',
            options:[
                {value:'Apartment', label:'Apartment',trigger:'room'},
                {value:'House',label:'House',trigger:'room'},
                {value:'Villa',label:'Villa',trigger:'room'},
                {value:'Townhouse',label:'Townhouse',trigger:'room'},
                {value:'Farmhouse',label:'Farmhouse',trigger:'room'},
                {value:'Residential Land',label:'Residential Land',trigger:'room'},
            ],
        },
        {
            id:'room',
            message:'Please tell me the features you want in the Property',
            trigger:'amenities',
        },
        {
            id:'amenities',
            user:true,
            validator: (value)=>{
                if (isNaN(value)){
                    const splittedValues=value.split(" ")
                    setAmenities(splittedValues)
                    console.log(amenities)
                    return true
                }
            },
            trigger:'confirm amenities',
           
        },
        {
            id:'confirm amenities',
            message:`So you are looking for ${amenities.join(",")}. Is there any mistake or everything is alright`,
            trigger:'verify',
        },
        {
            id:'verify',
            options:[
                {value:'yes',label:'Yes',trigger:'next2'},
                {value:'no',label:'No',trigger:'room'},
            ]
        },
        {
            id:'next2',
            message:'No of bedrooms?',
            trigger:'next2.5'
        },
        {
            id:'next2.5',
            options:[
                {value:'1',label:'1',trigger:'next3'},
                {value:'2',label:'2',trigger:'next3'},
                {value:'3',label:'3',trigger:'next3'},
                {value:'3+',label:'3+',trigger:'next3'}
            ],
        },
        {
            id:'next3',
            message:'Separate Kitchen?',
            trigger:'next3.5'
        },
        {
            id:'next3.5',
            options:[
                {value:'Yes',label:'Yes',trigger:'next4'},
                {value:'No',label:'No',trigger:'next4'},
            ],
        },
        {
            id:"next4",
            message:'Almost Done. Tell me your Budget range',
            trigger:'waiting3'
        },
        {
            id:'waiting3',
            user:true,
            trigger:'resp1'
        },
        {
            id:'resp1',
            message:'Thank you for your informations. Do you want to sell any house',
           trigger:'resp1.5'
        },
        {
            id:'resp1.5',
            options:[
                {value:'Yes',label:'Yes',trigger:'next5'},
                {value:'No',label:'No',trigger:'next6'}
            ],
        },
        {
            id:'next5',
            message:'Go to your profile and add the details there!!!',
            end:true
        },
        {
            id:'next6',
            message:'We are done. Thank You very much for joning us.',
            trigger:'next7'
        },
        {
            id:'next7',
            message:"You are registered in our buyers list",
            trigger:'next8'
        },
        {
            id:'next8',
            message:'We will contact you once we find correct house that meets your specifications. Good Bye!!!',
            end:true
        }

    ]
    const handleClick=()=>{
        setOpen(!open)
        console.log(open)
    }
    const [open,setOpen]=useState(false)
    return (
    <>   
       <button className='rounded-full bg-violet-600 fixed bottom-[2em] right-[2em] p-[1em] shadow-xl' onClick={handleClick}><LuBot className='text-4xl text-white'/></button>
       <ChatBot steps={step} className={`${open?'block':'hidden'}`}/>
    </>
  )
}

export default Chatbot


