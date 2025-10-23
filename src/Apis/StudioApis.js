import axios from "axios";


const getAllStudios = () => {
    return axios.get("https://us-central1-tattoo-shop-printing-dev.cloudfunctions.net/studios")
}

const getStudioById = (id) => {
    return axios.get(`https://us-central1-tattoo-shop-printing-dev.cloudfunctions.net/studios/${id}`)
}


export { getAllStudios, getStudioById }