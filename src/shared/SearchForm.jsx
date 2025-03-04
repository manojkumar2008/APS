"use client";

import { getAllAmbulance } from "@/service/Ambulance";
import { setIsAmbulance, setIsForSomeone, setIsList, setMapCenter, setMyValue, setSelectedCard, setUserCurrentLocation, setUserDestinationRoute, setUserLocation, setUserVehicleRoute } from "@/service/globalVariables/slices/StateSlice";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Map from "./Map";



const SearchForm = () => {

    // const [isList, setIsList] = useState(false);
    const isList = useSelector((state) => state.state.isList);
    const selectedCard = useSelector((state) => state.state.selectedCard);
    const userCurrentLocation = useSelector((state) => state.state.userCurrentLocation);
    // const userDestinationRoute = useSelector((state) => state.state.userDestinationRoute);

    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmation, setIsConfirmation] = useState(false);
    const [selectedOption, setSelectedOption] = useState("For Patient");
    const [isChecked, setIsChecked] = useState(false);
    const [isReqResForm, setIsReqResForm] = useState(true);
    const [isLoader, setIsLoader] = useState(false);
    const [afterList, setAfterList] = useState(false);
    const [CR, setCR] = useState(false);

    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [ambulances, setAmbulances] = useState(null);
    // const [selectedCard, setSelectedCard] = useState(1);

    const dispatch = useDispatch();
    const router = useRouter();


    const handleSelect = (option) => {
        setSelectedOption(option); // Update the button text
        setIsOpen(false); // Close the dropdown after selection
        if (option == "for someone") {
            dispatch(setIsForSomeone(true));
        }

    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page reload
        if (pickup.length <= 2 || destination.length <= 2) {
            dispatch(setIsList(false));

        } else {
            dispatch(setIsList(!isList));
        }
        setAfterList(true);
        dispatch(setMyValue(false));
        dispatch(setSelectedCard(1));
        dispatch(setUserDestinationRoute(true));
        dispatch(setUserLocation(false));
        getAmbulance();
        dispatch(setIsAmbulance(true));
        router.push("#ambulanceList");
        setTimeout(() => {
            document.getElementById("ambulanceList")?.scrollIntoView({ behavior: "smooth" });
        }, 500);
    };
    const confirmationHandler = () => {
        setIsConfirmation(false);
        dispatch(setIsList(false));
        dispatch(setMyValue(true));
        dispatch(setIsAmbulance(false));
        dispatch(setUserVehicleRoute(true));
        dispatch(setUserDestinationRoute(true));
        dispatch(setUserLocation(false));

        setIsLoader(true);

        setTimeout(() => {
            setIsReqResForm(false);
            setIsLoader(false);
            setCR(true);
        }, 3000);
    }
    const bookingCancel = () => {
        setIsConfirmation(false);
        dispatch(setIsList(false));
        setIsChecked(false);
        setIsLoader(true);
        setAfterList(false);
        dispatch(setUserDestinationRoute(false));
        dispatch(setUserVehicleRoute(false));
        dispatch(setUserLocation(true));

        setTimeout(() => {
            setIsReqResForm(true);
            setIsLoader(false);
            setCR(false);
        }, 3000);
    }
    const getAmbulance = () => {
        const amb = getAllAmbulance();
        setAmbulances(amb);
    }

    useEffect(() => {
        if (afterList) {
            if (pickup.length <= 2 || destination.length <= 2) {
                dispatch(setIsList(false));
                dispatch(setMyValue(true));
            }
        }
        getAmbulance();
        locationCenter();
    }, [pickup, destination]);

    const locationCenter = () => {
        // console.log('clicked');
        if (userCurrentLocation) {
            dispatch(setMapCenter(null)); // Step 1: Reset map center
            setTimeout(() => {
                dispatch(setMapCenter(userCurrentLocation)); // Step 2: Set correct location
            }, 100); // Small delay ensures Redux updates state
        }
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(setUserCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude }));
                }
            )
        }
    }

    return (
        <div className={`flex md:flex-row lg:flex-row ${CR ? "flex-col-reverse" : "flex-col"} sm:${CR ? "flex-col-reverse" : "flex-col"}`}>
            {isLoader ? (
                <Loader />
            ) : ""}
            {isReqResForm ? (<motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="card sm:ml-2 lg:ml-0 w-full mb-2 sm:my-2 sm:mt-2 md:my-4 md:mr-2 lg:my-0 sm:w-96 md:w-60 lg:w-72 border border-[#5B5B5B40] rounded-md p-2" style={{ height: "fit-content" }}
            >
                <h2 className='capitalize font-bold text-xl mt-1 mx-1 mb-6'>get your ambulance</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input type="text" id="name" className="bg-[#D9D9D966] rounded-md block w-full p-2.5 placeholder-black focus:border-gray-300" placeholder='Enter Name' required />
                    </div>
                    <div className="mb-4">
                        <input type="text" id="number" className="bg-[#D9D9D966] rounded-md block w-full p-2.5 placeholder-black" placeholder="Enter Phone Number " required />
                    </div>
                    <div className="location-section relative">
                        <span className='absolute top-9 left-3.5 z-10 w-0.5 h-[54px] bg-black'></span>
                        <div className="mb-4 relative">
                            <span className='absolute top-5 left-2 w-4 h-4'><img src="./circle.png" /></span>
                            <span className='absolute top-5 right-2 w-4 h-4 cursor-pointer' onClick={locationCenter}><img src="./location-arrow.png" /></span>
                            <input
                                type="text"
                                id="pickup"
                                className="bg-[#D9D9D966] text-sm px-10 rounded-md block w-full p-4 placeholder-black"
                                placeholder="Enter Pickup Location "
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                required />
                        </div>
                        <div className="mb-4 relative">
                            <span className='absolute top-5 left-2 w-4 h-4'><img src="square.png" alt="" /></span>
                            <input
                                type="text"
                                id="destination"
                                className="bg-[#D9D9D966] text-sm px-10 rounded-md block w-full p-4 placeholder-black"
                                placeholder="Enter Destination "
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <button onClick={() => setIsOpen(!isOpen)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="bg-[#D9D9D966] text-sm px-2 py-2.5 rounded-md inline-flex items-center capitalize" type="button">
                            <span className='w-5 h-5 mr-4'><img src="./user.png" /></span>
                            {selectedOption}
                            <svg className="w-4 h-4 text-gray-800 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute z-10 bg-[#116A5899] rounded-lg">
                                <ul className="py-2 text-sm text-white capitalize">
                                    <li onClick={() => handleSelect("For patient")} className='cursor-pointer active'>
                                        <a className="block px-4 py-2 hover:bg-[#ffffff20]">
                                            For patient
                                        </a>
                                    </li>
                                    <li onClick={() => handleSelect("for someone")} className='cursor-pointer'>
                                        <a className="block px-4 py-2 hover:bg-[#ffffff20]">
                                            for someone
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="button w-full flex justify-center mb-4">
                        {
                            !isList ?
                                <button type="submit" className="text-white bg-[#054D3F] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-32 capitalize">search</button>
                                : ""
                        }
                    </div>
                </form>
            </motion.div>)
                : (<motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card card-confirm w-full md:w-80 lg:w-80 border border-[#5B5B5B40] rounded-md p-1 mt-4 md:mx-2 md:mt-4 lg:mt-0" style={{ height: "fit-content" }}>
                    <div className="header-section border-b flex justify-between items-center p-2">
                        <h2 className='capitalize font-bold text-lg mt-1 mx-1 text-[#FF7700]'>booking is confirmed !</h2>
                        <div className="time-view w-12 h-12 bg-[#116A58] flex flex-col justify-center items-center rounded-sm text-white">
                            <span className="text-xl leading-snug">15</span>
                            <span className="text-sm leading-none">min</span>
                        </div>
                    </div>
                    <div className="address-section border-b flex flex-row justify-between p-2">
                        <div className="details flex flex-col justify-center">
                            <span className="capitalize text-xs font-medium my-1"><strong>ambulance type:</strong> ALS</span>
                            <span className="capitalize text-xs my-1"><strong>Vehicle Number :</strong> ODJK236752</span>
                            <span className="capitalize text-xs my-1"><strong>contact Number :</strong> 8756987688</span>
                        </div>
                        <div className="rating flex flex-col justify-center items-center my-3">
                            <img src="./user2.png" className="w-12 h-12 mb-1" />
                            <p className="capitalize text-xs font-semibold">rajendra mitra</p>
                            <img src="./fiveStar.png" className="w-18 h-8" />
                        </div>
                    </div>
                    <div className="body-section flex justify-between py-4 px-1">
                        <div className="drop-location flex items-center">
                            <img src="./pin.png" className="w-4 h-4" />
                            <span className="text-sm leading-none p-0">capital hospital, Unit-6</span>
                        </div>
                        <div className="body-buttons flex">
                            <span className="call-btn flex flex-col items-center mx-2">
                                <img src="./phone2.png" className="w-8 h-8" />
                                <p className="text-[10px] font-semibold">call driver</p>
                            </span>
                            <span className="shield-btn flex flex-col items-center mx-2">
                                <img src="./shield.png" className="w-8 h-8" />
                                <p className="text-[10px] font-semibold">safety</p>
                            </span>
                        </div>
                    </div>
                    <div className="amount-section px-2">
                        <div className="total-price flex text-xs my-4 capitalize">
                            <p><strong>total price: </strong>5000.00</p>
                        </div>
                        <div className="payment-method text-xs my-4 capitalize">

                            <p><strong>method type: </strong>cash</p>
                        </div>
                    </div>
                    <div className="bottom-section w-full text-center py-6">
                        <button className="w-2/4 bg-[#116A58] py-2 text-center rounded-md text-white capitalize" onClick={bookingCancel}>cancel request</button>
                    </div>

                </motion.div>)
            }
            <div className="small-device-map block md:hidden lg:hidden h-5/6 w-full">
                <Map />
            </div>
            {isList ?
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    id="ambulanceList"
                    className=" list-ambulance border md:border-none lg:border-none h-[70vh] sm:w-full md:w-80 md:h-[90vh] lg:h-[86vh] lg:w-96 ml-0 lg:ml-2 md:mr-2 md:mt-2 lg:mt-0 relative"
                >
                    <div className="header-container flex justify-between mb-3 p-2">
                        <h2 className="capitalize font-bold text-xl">choose an ambulance</h2>
                        <h2 className="font-extrabold text-lg">15 KM.</h2>
                    </div>
                    <div className="card-container overflow-y-scroll h-3/4">
                        {
                            ambulances?.map((ambulance) => (
                                <div
                                    key={ambulance.id}
                                    className={`card w-full h-28 rounded-3xl mb-2 flex items-center justify-between cursor-pointer ${selectedCard === ambulance.id ? "border-2 border-[#116A58]" : "border-2 border-transparent"
                                        }`}
                                    onClick={() => dispatch(setSelectedCard(ambulance.id))}
                                >
                                    <div className="image h-20 w-24 mr-1">
                                        <img src={ambulance.image} className="h-full w-full" alt="ambulance" />
                                    </div>
                                    <div className="details w-2/4">
                                        <h2 className="capitalize font-bold text-sm">{ambulance.title}</h2>
                                        <p className="text-xs text-gray-500 my-1">{ambulance.time}</p>
                                        <p className="text-xs text-gray-500">{ambulance.description}</p>
                                    </div>
                                    <div className="rate pr-1">
                                        <p className=" text-xs flex items-center justify-end text-[#116A58]">
                                            <img src="./pricetag.png" className="h-3 w-3 mr-1" alt="discount" /> 25% off
                                        </p>
                                        <p className="flex items-center justify-end text-sm">
                                            <img src="./rupee.png" className="h-6 w-6" alt="rupee" /> {ambulance.price}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="bottom-card h-1/6 w-full bg-[#116A58BF] absolute left-0 bottom-0 flex items-center justify-center">
                        <div className="payment flex mr-4">
                            <img src="./money.png" className="h-10 w-10" />
                            <span className="flex items-center text-white font-bold cursor-pointer">cash
                                <svg className="w-4 h-4 text-white mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
                                </svg></span>
                        </div>
                        <button onClick={() => { setIsConfirmation(true); }} className="button capitalize bg-[#054D3F] w-3/5 h-12 rounded-lg text-white text-center">get an ambulance</button>
                    </div>
                    {/* confirmation modal */}
                    {isConfirmation ?
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            id="confirmation-modal"
                            className="absolute top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-full h-full"
                        >
                            <div className="relative p-2 w-3/4 max-w-md bg-white rounded-lg shadow-lg">
                                {/* Modal Header */}
                                <div className="flex items-center justify-end p-2 rounded-t border-gray-300 border-b">
                                    <h3 className="text-md capitalize font-semibold text-black flex mr-16 text-center">
                                        consent <br /> confirmation
                                    </h3>
                                    <button
                                        onClick={() => { setIsConfirmation(false); setIsChecked(false) }}
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
                                <div className="p-2 border-b border-gray-300">
                                    <p className='mb-1 text-[10px] text-gray-600'>
                                        I, the undersigned, confirm that I have been informed about the appropriate level of medical support required for the patient’s condition. Advanced Life Support (ALS) is required for critical patients who need advanced medical interventions such as cardiac monitoring, airway management, and emergency medications. Basic Life Support (BLS) is suitable for non-critical patients, providing essential medical transport with basic first aid and oxygen support.    MORE...
                                    </p>
                                </div>

                                {/* modal bottom */}
                                <div className="p-2">
                                    <div className="flex items-start mb-5">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                type="checkbox"
                                                value=""
                                                onClick={() => { setIsChecked(!isChecked) }}
                                                className="w-4 h-4 appearance-none border border-[#116A58CC] bg-white rounded-sm cursor-pointer checked:bg-[#116A58CC] checked:border-[#116A58CC] hover:bg-[#116A5888] hover:border-[#116A58CC] relative flex items-center justify-center"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="button w-full text-center">
                                        {isChecked ?
                                            (<button className="capitalize text-center bg-[#116A58] text-white rounded-xl p-2 w-2/4" onClick={confirmationHandler}>confirm</button>)
                                            : (<button className="capitalize text-center bg-[#116A5840] text-black rounded-xl p-2 w-2/4" disabled>confirm</button>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        : ""}
                </motion.div>
                : ""
            }
        </div>
    )
}

export default SearchForm
