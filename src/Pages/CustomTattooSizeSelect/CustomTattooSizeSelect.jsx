import { useState,useEffect } from "react";
import tattooSmall from "../../assets/tattoo-small.jpg";
import tattooMedium from "../../assets/tattoo-medium.jpg";
import tattooLarge from "../../assets/tattoo-large.jpg";
import AppointmentTopBar from '../../Components/AppointmentTopBar/AppointmentTopBar';
import SidebarButtonUi from '../../Components/SidebarButtonUi/SidebarButtonUi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCustomTattoSize } from '../../Redux/CustomTattooDetailSlice';
import { setCustomTattooIsActive } from "../../Redux/CustomTattooDetailSlice";
import Transition from "../../Transition";
import { useSelector } from "react-redux";
import "./style.css"
const CustomTattooSizeSelect = () => {
     const customTattooDetail = useSelector(state => state.customTattoo)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buttons = [
        { img: tattooSmall, text: "Tattoo Small"},
        { img: tattooMedium, text: "Tattoo Medium"},
        { img: tattooLarge, text: "Tattoo Large" },
    ];
    console.log(customTattooDetail)
    const nextStep = () => navigate("/service/custom-tattoo/book-appointment")

    useEffect(() => {
         if(customTattooDetail.tattooOption === ""){
            navigate("/service")
         }
    },[])
     useEffect(() => {
              dispatch(setCustomTattoSize(buttons[selectedIndex].text))
              dispatch(setCustomTattooIsActive(true))
          },[selectedIndex])
  return (
     <div className="custom-tattoo-size-select">
       <AppointmentTopBar title={"Custom Tattoos"}/>

       <div className="custom-tattoo-size-select-detail">
        <div className="custom-tattoo-size-headings">
            <h3>
            Tell Us About Your Tattoo
        </h3>
        <p>
            Preferred Size of Your Tattoo
        </p>

        </div>
        

        <div className="custom-tattoo-sizes-option">
             {
                buttons.map((size,indx) => {
                    return <SidebarButtonUi 
                               key={indx} 
                               service={size}  
                               isSeleted={selectedIndex === indx} 
                               setSelectedIndex={() => setSelectedIndex(indx)}
                               nextStep={() => nextStep}
                               />
                })
             }
        </div>

       </div>
    </div>
  )
}

export default Transition(CustomTattooSizeSelect)
