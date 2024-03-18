import Image from 'next/image'
import React from 'react'
import { FaBath, FaBed, FaHeart } from 'react-icons/fa6';
import { TbRulerMeasure } from 'react-icons/tb';
import Button from './Button';
import { useRouter } from 'next/navigation';

const PropertyListingsCard = ({data}) => {
    const formatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      });
    const diplayAddress = `${data?.location?.address?.suburb ?? ''}
    ${data?.location?.address?.city ?? ''} 
    ${data?.location?.address?.state ?? ''}`
    const router = useRouter();
    const handleClick = () => {
        router.push(`/listing?id=${data?._id}`)
    }
  return (
    <div className='flex flex-col max-w-60 min-w-60 rounded-lg shadow-lg  hover:shadow-2xl'
    >
        {/* Hero Iamge */}
        <div className='w-full relative mb-2'>
            <Image 
            src = {data?.media?.thumbnail}
            width = {100}
            height = {100}
            alt = {data?.property_title}
            className = 'w-full object-cover h-40 rounded-t-lg'
            />
            <div className='absolute text-sm tracking-wider font-semibold bottom-1 left-1 bg-white p-1 opacity-50 rounded-sm truncate ...'>
                {diplayAddress}
            </div>
            <button className='absolute text-md tracking-wider font-semibold top-1 left-1 bg-white p-1 opacity-50 rounded-full  hover:text-red-600 hover:opacity-100 truncate ...'
            title = {'Add to Favorite'}
            onClick = {() => {}}
            aria-label="Add to Favorite"
            >
               <FaHeart />
            </button>
        </div>
        <div className='p-2 space-y-1.5'>
            <div className='flex gap-1'>
            <h3 className='px-2 py-1 text-xs uppercase tracking-wider font-semibold border border-active-orange rounded-md text-active-orange'>{data?.listing_type?.label}</h3>
            <h3 className='px-2 py-1 text-xs uppercase tracking-wider font-semibold   rounded-lg text-active-orange'>{data?.property_type?.label}</h3>
            <Button className={'px-1.5 py-1 uppercase text-sm'}
            onClick = {handleClick}
            title = {'View Detail'}
            aria-label="View Detail"
            >View
            </Button>
            </div>
            <div className='text-center'>
                <p><span className='font-bold tracking-wide uppercase'>Sale Price:  </span> {formatter.format(data?.price)}</p>
            </div>
        </div>
        {/* Additional details */}
        <div className="flex gap-1 flex-wrap mb-2 px-2">
            <Button
              className={
                "outline_btn px-2 py-1 font-medium text-sm flex  items-center rounded-lg gap-2"
              }
            >
              <FaBed size={20} /> {data?.bedrooms}
            </Button>

            <Button
              className={
                "outline_btn px-2 py-1 font-medium text-sm flex  items-center rounded-lg gap-2"
              }
            >
              <FaBath size={20} /> {data?.bathrooms}
            </Button>
            <Button
              className={
                "outline_btn px-2 py-1 font-medium text-sm flex  items-center rounded-lg gap-2"
              }
            >
              <TbRulerMeasure size={20} /> {data?.area} sqft
            </Button>
          </div>
        {/* {data?.property_title} */}
    </div>
  )
}

export default PropertyListingsCard
