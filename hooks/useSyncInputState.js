import React, { useEffect } from 'react'

const useSyncInputState = (onChange, states, updateValue) => {
    useEffect(()=>{
        console.log(updateValue)
        onChange(updateValue)
    }, [...states])
  return updateValue
}

export default useSyncInputState
