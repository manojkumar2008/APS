"use client";
import { setIsForSomeone, setIsList, setSelectedCard } from '@/service/globalVariables/slices/StateSlice';
import { getAllRides } from '@/service/Rides';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {

    const [isAboutUs, setIsAboutUs] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isRide, setIsRide] = useState(false);
    const [rides, setRides] = useState([]);

    const dispatch = useDispatch();

    const myValue = useSelector((state) => state.state.myValue);
    const forSomeone = useSelector((state) => state.state.isForSomeone);
    const selectedCard = useSelector((state) => state.state.selectedCard);


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page reload
        dispatch(setIsList(true));
        dispatch(setIsForSomeone(false));
        dispatch(setSelectedCard(1));
    };

    useEffect(() => {
        const getRides = getAllRides();
        setRides(getRides);
    });
    console.log(rides);

    return (
        <div className={`absolute top-0 ${myValue ? "bg-[#054D3F]" : "bg-white"} ${myValue ? "shadow-md" : "shadow-[0px_4px_0_rgba(210,215,211,0.8)]"} w-full transition-all z-30`}>
            <div className="w-full mx-0 flex justify-between items-center">
                <div className="leftMenu flex items-center ml-2 pt-1">
                    <Link href="/" className="text-white text-2xl font-bold">
                        <img src="./aps_logo2.png" alt="" height="40px" width="40px" />
                    </Link>
                    {/* Desktop Menu */}
                    <div className="flex space-x-6 ml-8">
                        {/* <p onClick={() => dispatch(setIsForSomeone(true))} className={` ${myValue ? "text-white" : "text-[#054D3F]"} transition capitalize font-medium cursor-pointer`}>
                            Ride
                        </p> */}
                        <div className={`${myValue ? "text-white" : "text-[#054D3F]"} flex items-center transition capitalize font-medium cursor-pointer relative`}
                            onClick={() => { setIsAboutUs(!isAboutUs) }}
                        >
                            about us
                            {/* <svg className={`w-4 h-4 ${myValue ? "text-white" : "text-[#054D3F]"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                            </svg> */}
                            {/* {isAboutUs ?
                                (<div className="absolute z-30 top-6 w-40">
                                    <div className="px-3 py-2 bg-[#379280] border-b border-gray-200 rounded-t-lg">
                                        <h3 className="font-semibold text-center">what we have?</h3>
                                    </div>
                                    <div className="px-3 py-2 bg-[#116A5830] rounded-b-lg text-black text-xs">
                                        <p>And here's some amazing content. It's very engaging. Right?</p>
                                    </div>
                                </div>) : ""
                            } */}
                        </div>
                        <p className={` ${myValue ? "text-white" : "text-[#054D3F]"} transition capitalize font-medium cursor-pointer`}
                            onClick={()=>{setIsRide(!isRide)}}
                        >
                            Past Rides
                        </p>

                        {/* rides vehicles modal */}
                        {isRide &&
                        <div className="absolute pastRides bg-[#FFFFFFE5] p-3 w-96 top-10 left-0 rounded-lg drop-shadow-xl">
                            <h2 className='font-bold text-2xl capitalize'>past rides</h2>
                            <div className="card w-full my-2 bg-[#ffffff] border border-[#00000080] rounded-lg flex">
                                <div className="ambulanceDetails p-2">
                                    <h2 className='text-sm capitalize'>ride details</h2>
                                    <div className="ambulanceImg py-4 text-center">
                                        <img src="advance-ambulance1.png" className='w-28' />
                                        <p className='text-[7px] capitalize'>service type: advance life support</p>
                                    </div>
                                </div>
                                <div className="ambulanceBookingDetails w-full px-2 flex h-6/6 relative">
                                    <div className="distance h-full flex justify-center items-center pl-4">
                                        <span className='absolute top-1 text-[7px] text-center'>Feb 23th 2025 <br /> 10:36 AM </span>
                                        <span className='absolute left-0 top-[48%] text-[7px]'><span className='text-[#0ABE48]'>10KM</span> <br /> <span className='text-[#FF0004]'>20min</span>  </span>
                                        <img src="./distance.png" className='h-28' />
                                        <span className='absolute bottom-2 text-[7px]'>10:36 AM</span>
                                    </div>
                                    <div className="vehicleOrderDetails h-full w-full flex flex-col justify-center ml-3">
                                        <p className='text-[7px]'>
                                            Bhanja Kala Mandap
                                            <br />
                                            Kalpana Square, BJB Nagar, Bhubaneswar, Odisha
                                        </p>
                                        <div className="ambulanceDetailsF text-[7px] my-1 py-3 px-2 bg-[#D9D9D94D]">
                                            <p className='leading-loose'>
                                                Ride ID : 3452245390 <br />
                                                Vehicle Number : ODJK236752 <br />
                                                Total Amount : 5000.00 <br />
                                                Mode of Payment : Cash
                                            </p>
                                        </div>
                                        <p className='text-[7px]'>
                                            Bhanja Kala Mandap
                                            <br />
                                            Kalpana Square, BJB Nagar, Bhubaneswar, Odisha
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {rides.map((ride) => (
                                <div key={ride.id} className="pastRidesList h-20 flex justify-between my-1 mb-2 hover:bg-[#d9d9d950]">
                                    <div className="vehicleType bg-[#d9d9d9] h-full w-20 p-2 rounded-lg">
                                        <img src={ride.image} className='h-full' />
                                    </div>
                                    <div className="pricing flex flex-col h-full justify-center items-start">
                                        <span>{ride.city}</span>
                                        <span className='text-xs font-thin py-1'>{ride.date} ● {ride.time}</span>
                                        <span className='text-xs font-thin'>{ride.price} ● {ride.status}</span>
                                    </div>
                                    <div className="btn-viewDetails h-full flex justify-center items-center">
                                        <button className='capitalize bg-[#d9d9d9] p-2 rounded-lg h-10 text-[14px]'>view details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                    </div>
                </div>
                <div className="rightMenu text-white mr-1 md:mr-1 lg:mr-1 flex justify-center">
                    <ul className='flex items-center justify-center space-x-4 lg:space-x-6 pt-1'>
                        <li className="flex items-center justify-center h-8 md:h-8 md:w-8 lg:h-8 cursor-pointer ">
                            {
                                myValue ? (
                                    <img
                                        src="./phone.png"
                                        alt=""
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <img
                                        src="./phone1.png"
                                        alt=""
                                        className="w-full h-full"
                                    />
                                )
                            }
                        </li>
                        <li className="flex items-center justify-center h-8 md:h-8 md:w-8 lg:h-8 cursor-pointer ">
                            {
                                myValue ? (
                                    <img
                                        src="./smart-assistance.png"
                                        alt=""
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <img
                                        src="./smart-assistance1.png"
                                        alt=""
                                        className="w-full h-full"
                                    />
                                )
                            }
                        </li>
                        <li className="flex items-center justify-center h-8 md:h-8 md:w-8 lg:h-8 cursor-pointer relative">
                            {
                                myValue ? (
                                    <img
                                        src="./next.png"
                                        alt=""
                                        className="w-full h-full"
                                        onClick={() => { setIsProfile(!isProfile) }}
                                    />
                                ) : (
                                    <img
                                        src="./next1.png"
                                        alt=""
                                        className="w-full h-full"
                                        onClick={() => { setIsProfile(!isProfile) }}
                                    />
                                )
                            }
                            {isProfile ? (
                                <div className="absolute pt-4 z-30 top-8 right-1 w-48 h-60 bg-white text-black rounded-lg shadow-lg cursor-default">
                                    <ul>
                                        <li className='border-b-4 border-[#14FE64]'></li>
                                        <li className='border-b pt-4 text-sm flex items-end justify-center font-semibold hover:bg-gray-100 cursor-pointer'>Login as <strong className='text-base mx-1 text-[#FF0004]'>Hospital</strong></li>
                                        <li className='border-b pt-4 text-sm flex items-end justify-center font-semibold hover:bg-gray-100 cursor-pointer'>Login as <strong className='text-base mx-1 text-[#0EE3F5]'>User</strong></li>
                                    </ul>
                                    <span className='flex items-center py-1 w-full justify-center absolute bottom-0 text-xs'>
                                        <p className='capitalize px-1 text-gray-500 border-r-2 border-black'>new user ? </p>
                                        <p className='capitalize px-1 text-black cursor-pointer text-sm font-semibold'>Sign up</p>
                                    </span>
                                </div>
                            ) : ""}
                        </li>
                    </ul>
                </div>
            </div>

            {/* modal for ride */}
            {/* <!-- Main modal --> */}
            {forSomeone && (
                <div
                    id="authentication-modal"
                    className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                >
                    <div className="relative p-2 w-full max-w-md bg-white rounded-lg shadow-sm">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-2 rounded-t border-gray-200 dark:border-gray-600">
                            <h3 className="text-md font-semibold text-black flex">
                                <img src="./profile1.png" className='h-5 w-5 mr-2' />
                                Book an Ambulance for Someone else
                            </h3>
                            <button
                                onClick={() => dispatch(setIsForSomeone(false))}
                                className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-100 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-200 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-2">
                            <p className='mb-1 text-red-600'>Drivers will see this name.</p>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-black"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="bg-[#D9D9D966] block w-full p-2.5 rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="number"
                                        className="block mb-2 text-sm font-medium text-black"
                                    >
                                        Enter Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="number"
                                        className="bg-[#D9D9D966] block w-full p-2.5 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="button-area w-full text-center">
                                    <button
                                        type="submit"
                                        className="w-2/4 text-white bg-[#116A58] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Navbar
