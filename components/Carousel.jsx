import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
export default function Carousel({ slides, autoSlide = false, interval = 3000 }) {
    const [current, setCurrent] = useState(0)
    const prev = () => {
        if (current === 0) {
            setCurrent(slides.length - 1)
        }
        else {
            setCurrent(current - 1)
        }
    }
    const next = () => {
        if (current === slides.length - 1) {
            setCurrent(0)
        }
        else {
            setCurrent(current + 1)
        }
    }
    useEffect(()=>{
       if (!autoSlide)  return
       const slideInterval = setInterval(next, interval)
       return ()=> clearInterval(slideInterval)
    }, [current])
    return (
        <div className="overflow-hidden w-full h-full relative ">
            <div
                className="flex transition-transform ease-out duration-500 gap-2 "
                style={{
                    transform: `translateX(-${current * 100}%)`
                }}
            >
                {slides.map((slide, index) => (
                    <img
                        src={slide.src}
                        width={100}
                        height={100}
                        alt={slide?.alt}
                        key={slide?.alt + index}
                        className="w-full h-full"
                    />
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between mx-10 p-4">
                <button className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white "
                    onClick={prev}
                >
                    <FaAngleLeft size={40} />
                </button>
                <button className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white "
                    onClick={next}
                >
                    <FaAngleRight size={40} />
                </button>
            </div>
            <div className="absolute bottom-2 left-0 right-0 ">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((slide, index) => <div 
                    onClick={()=>setCurrent(index)}
                    className={`transition-all w-3 h-3 bg-white rounded-full ${current === index ? "p-4" : "bg-opacity-50"} cursor-pointer`} />)}
                </div>
            </div>
        </div>
    )
}