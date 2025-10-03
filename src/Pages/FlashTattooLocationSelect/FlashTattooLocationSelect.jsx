import "./style.css"
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar"
import { useState,useEffect } from "react"
import { useContinue } from "../../Provider/ContinueContext"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setFlashTattooLocation } from "../../Redux/FlashTattoDetailSlice"
import Transition from "../../Transition"
import { useSelector } from "react-redux";

const location = [
    {  name: "XYZ, ABC 119, Co 12345"},
    {  name: "XYZ, ABC 119, Co 12345"},
    {  name: "XYZ, ABC 119, Co 12345"},
    {  name: "XYZ, ABC 119, Co 12345"},

]
const FlashTattooLocationSelect = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
         const navigate = useNavigate();
         const dispatch = useDispatch();
         const nextStep = () => navigate("/service/flash-tattoo/book-appointment")
          const flashTattooDetail = useSelector(state => state.flashTattoo);
         const {setOnContinue} = useContinue();


          useEffect(() => {
          if(flashTattooDetail.tattooOption === "" || flashTattooDetail.size === ""){
            navigate("/service")
          }
        },[])
         useEffect(() => {
                   dispatch(setFlashTattooLocation(location[selectedIndex].name))
                   setOnContinue(() => nextStep)
               },[selectedIndex])
  return (
     <div className="flash-tattoo-location-selection">
        <AppointmentTopBar title={"Flash Tattoo"}/>
        <div className="flash-tattoo-location-select-detail">
       <div className="flash-tattoo-location-heading">
        <h3>Choose Your Preferred Location</h3>
      </div>

      <div className="flash-tattoo-location">
           
          {
            location.map((location,indx)=> {
                return  <div 
                         className={`location ${selectedIndex === indx && "selected"}`}
                         onClick={() => setSelectedIndex(indx)}
                         >
                      <div className="location-img-cont">
                           {/* <img src="" alt="" /> */}
                      </div>

                      <div>
                          <h2>{location.name}</h2>
                      </div>
                </div>
            })
          }
      </div>
        </div>
      
    </div>
  )
}

export default Transition(FlashTattooLocationSelect)
