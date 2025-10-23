import axios from "axios";


const createAppointment = (data) => {
    return axios.post("https://us-central1-tattoo-shop-printing-dev.cloudfunctions.net/appointment", data)
}

export { createAppointment }