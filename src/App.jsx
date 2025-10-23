import { useEffect, useState } from 'react'
import router from './Router/route'
import { RouterProvider } from 'react-router-dom'
import { getAllStudios } from './Apis/StudioApis'
import { useDispatch } from 'react-redux'
import { setAllStudios } from './Redux/AllStudios'
import { getCalenderApi } from './Apis/SlotsApi'
import './App.css'

function App() {


    const dispatch = useDispatch();

    const fetchStudios = async () => {
        try {
            const response = await getAllStudios();
            
            dispatch(setAllStudios(response.data?.studios));
        } catch (error) {
            console.error("Error fetching studios:", error);
        }
    };

const fetchCalender = async () => {
  try {
    const response = await getCalenderApi("cckPA4zUL3gvqD1SqcB1", {
    service: "tattoo",
    sub_type: "custom",
    tattoo_option: "traditional",
    tattoo_size: "small",
});
    console.log("SUCCESS", response.data);
  } catch (err) {
    console.error("AXIOS ERROR MESSAGE:", err.message);

  }
};

    useEffect(() => {
        fetchStudios();
        fetchCalender();
    }, []);

    return <RouterProvider router={router} />;
  
}

export default App
