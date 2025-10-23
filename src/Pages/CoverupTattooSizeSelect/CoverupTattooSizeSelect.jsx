import "./style.css"
import tattooSmall from "../../assets/tattoo-small.jpg";
import tattooMedium from "../../assets/tattoo-medium.jpg";
import tattooLarge from "../../assets/tattoo-large.jpg";
import { useNavigate } from "react-router-dom"
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar"
import SidebarButtonUi from "../../Components/SidebarButtonUi/SidebarButtonUi"
import { useDispatch } from "react-redux";
import { setCoverupTattoSize } from "../../Redux/CoverUpTattooDetailSlice";
import { useSelector } from "react-redux";
import Transition from "../../Transition";
import MainButtonUi from "../../Components/MainButtonUi/MainButtonUi";
import { useState,useEffect } from "react";

  const buttons = [
        { img: tattooSmall, text: "Tattoo Small",  value : "small" },
        { img: tattooMedium, text: "Tattoo Medium", value : "medium"},
        { img: tattooLarge, text: "Tattoo Large", value : "large" },
    ];
const CoverupTattooSizeSelect = () => {
 
    const coverupTattooDetail = useSelector(state => state.coverupTattoo)
     const [selectedIndex, setSelectedIndex] = useState(0);
     const navigate = useNavigate();
     const dispatch = useDispatch();
      const nextStep = () => navigate("/service/coverup-tattoo/color")
      
      useEffect(() => {
         if(coverupTattooDetail.tattoo_placement === ""){
            navigate("/service")
         }
    },[])

      useEffect(() => { 
              dispatch(setCoverupTattoSize(buttons[selectedIndex].value))
        },[selectedIndex])
  

  return (
    <div className="coverup-tattoo-size-select">
       <AppointmentTopBar title={"Coverup / Rework Tattoos"}/>

       <div className="coverup-tattoo-size-selection-detail">
        <h3>
            Tell Us About Your Tattoo
        </h3>

        <p className="tattoo-size">Preferred Size of Your Tattoo</p>

        <div className="coverup-tattoo-size-option">
             {
                buttons.map((design,indx) => {
                    return <MainButtonUi 
                          key={indx} 
                          service={design}  
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

export default Transition(CoverupTattooSizeSelect)
