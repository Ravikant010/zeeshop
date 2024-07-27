"use client"
import React, { useEffect, useState } from 'react'
import { Combobox } from './ui/combox';
type Props = {}
export default function MidBar({ }: Props) {
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    return (
        <div style={{
            position: scrollPosition >= 560 ? "fixed" : "relative",
            top: scrollPosition >= 560 ? '57px' : "0"
        }} className="w-full  z-10">
            <div className="w-full grid grid-cols-2 p-2  content-center bg-[#fdfffc] border-b-[1px] border-black">
                <div className=" flex items-center">Sort By:</div>
                <div className="flex items-center justify-around">
                    <Combobox text="Rating" listarray={
                        [
                            { value: "4", label: "4" }, {
                                value: "3", label: "3"
                            }
                        ]
                    } />
                    <Combobox text="Discount" listarray={
                        [
                            { value: "25%", label: "25%" }, {
                                value: "50%", label: "50%",
                            },
                            {
                                value: "70%", label: "70%"
                            }
                        ]
                    } />
                    <div className="w-2/5"></div>
                </div>
            </div>
        </div>
    )
}