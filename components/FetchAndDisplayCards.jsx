'use client'
import React, {useState, useEffect} from 'react'

const FetchAndDisplayCards = ({apiEndpoint, CardComponet, session}) => {
    const [cards, setCards] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
        setError(null)
        try{
        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => setCards(data))
        }
        catch(err){
            setError(err)
        }
    }, [apiEndpoint])
    if (cards.length === 0 && error === null) {
      return <div className='w-full h-full text-2xl font-bold  text-center'>Loading...</div>
    }
    if(error !== null){
        return <div className='w-full h-full text-2xl font-bold  text-center text-red-500'>
            Error while loading:
            <br></br>
             <p className='tex-xs'>{error.message}</p>
             <br></br>
            <button onClick={() => window.location.reload()}  className='outline_btn'>Reload</button>
        </div>
    }
    return (
      <div className='w-full h-full flex gap-x-4 gap-y-5 flex-wrap '>
        {cards.map((cardData, index) => (
          <CardComponet key={index} data={cardData} session={session} />
        ))}
      </div>
    )
  }


export default FetchAndDisplayCards
