import Image from 'next/image'
import React from 'react'

const UserDataDisplay = ({user}) => {
    console.log(user)
  return (
    <div className='w-full flex  gap-2 bg items-center'>
        <Image
        width={100}
        height= {100}
        src = {user?.image}
        alt = 'profile image'
        className = 'rounded-full border-4 border-active-orange border-dashed p-1'
        />
        <div className='text-md tracking-wider lg:text-lg truncate ...'>
            <p className='font-bold'>{user?.username}</p>
            <p>{user?.email}</p>
        </div>
    </div>
  )
}

export default UserDataDisplay
