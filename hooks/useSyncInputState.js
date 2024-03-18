import React, { useEffect } from 'react'

const useSyncInputState = (onChange, states, updateValue) => {
    useEffect(()=>{
        onChange(updateValue)
    }, [...states])
  return updateValue
}

export default useSyncInputState
