import axios from "axios";


const getAllAvailableSlotsFroParticularService = (studioId,date,service) => {
    return axios.get(`https://us-central1-tattoo-shop-printing-dev.cloudfunctions.net/availability/available-slots/${studioId}?date=${date}&service=${service}`)
}


const getAllAvailabeDatesForNext3Months = (studioId) => {
    return axios.get(`https://us-central1-tattoo-shop-printing-dev.cloudfunctions.net//us-central1/availability/next-three-months/${studioId}`)
}


export { getAllAvailableSlotsFroParticularService, getAllAvailabeDatesForNext3Months }