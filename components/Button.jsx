import React from 'react'

const Button = ({children, clickHandler, disable, className, hidden, type = 'button',...rest}) => {
  return (
    <button 
    className={` primary_btn ${className} ${disable && 'disabled'} ${hidden && 'hidden'}`}
    onClick = {!disable && clickHandler}
    type = {type}
    {...rest}
    >
        {children}
    </button>
  )
}

export default Button
