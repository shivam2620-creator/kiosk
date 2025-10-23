import axios from "axios";

const getCalenderApi = (studioId, data) => {

  const url = `https://us-central1-tattoo-shop-printing-dev.cloudfunctions.net/appointment/${studioId}/calendar`;

  return axios.post(url, data);
};


export {getCalenderApi}