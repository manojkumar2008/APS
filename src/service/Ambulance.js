const ambulances = [
    {
        id: 1,
        image: "./advance-ambulance1.png",
        title: "Advance Life Support",
        time: "15 mins away ● 11:40 pm",
        description: "Equipped with life-saving gear, experts, and IoT-enabled devices for emergency support.",
        price: "5000.00",
    },
    {
        id: 2,
        image: "./bls-ambulance1.png",
        title: "Basic Life Support",
        time: "35 mins away ● 12:15 pm",
        description: "Equipped with only oxygen support for non-critical emergencies.",
        price: "3000.00",
    },
    {
        id: 3,
        image: "./hv-ambulance2.png",
        title: "Hearse Van",
        time: "30 mins away ● 12:10 pm",
        description: "Respectful and secure transportation for the departed.",
        price: "4000.00",
    },
];

export const getAllAmbulance = () => {
    return ambulances;
}