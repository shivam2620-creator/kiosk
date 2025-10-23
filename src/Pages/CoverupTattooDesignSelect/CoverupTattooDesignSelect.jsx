import "./style.css"
import arms from "../../assets/arms.jpg"
import legs from "../../assets/legs.jpg"
import back from "../../assets/back.jpg"
import belly from "../../assets/belly.jpg"
import neck from "../../assets/neck.jpg"
import chest from "../../assets/chest.jpg"
import { useNavigate } from "react-router-dom"
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar"
import SidebarButtonUi from "../../Components/SidebarButtonUi/SidebarButtonUi"
import { useDispatch } from "react-redux"
import { setCoverupTattooPlacement } from "../../Redux/CoverUpTattooDetailSlice"
import { setCoverupTattooImg } from "../../Redux/CoverUpTattooDetailSlice"
import { setCoverupTattooIsActive } from "../../Redux/CoverUpTattooDetailSlice"
import { useState,useEffect } from "react"
import { resetCustomTattooValue } from "../../Redux/CustomTattooDetailSlice"
import { resetFlashTattooValue } from "../../Redux/FlashTattoDetailSlice"
import { resetPiercingValue } from "../../Redux/PiercingSlice"
import MainButtonUi from "../../Components/MainButtonUi/MainButtonUi"
import Transition from "../../Transition"

    const buttons = [
        { img: arms,text: "Arms" },
        { img: legs,text: "Legs"},
        {img: back,  text: "Back"},
        {img: belly, text: "Belly"},
        { img: neck, text: "Neck" },
        {img: chest,text: "Chest"},
        
      ];

const CoverupTattooDesignSelect = () => {

    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();

    const nextStep = () => navigate("/service/coverup-tattoo/size")
     useEffect(() => {
              dispatch(setCoverupTattooIsActive(true));
              dispatch(setCoverupTattooImg(buttons[selectedIndex].img))
              dispatch(setCoverupTattooPlacement(buttons[selectedIndex].text));

              dispatch(resetCustomTattooValue());
              dispatch(resetFlashTattooValue());
              dispatch(resetPiercingValue());
        },[selectedIndex])

  


  return (
    <div className="coverup-tattoo-design-select">
       <AppointmentTopBar title={"Coverup / Rework Tattoos"}/>

       <div className="coverup-tattoo-desing-selection-detail">
        <h3>
            Tell Us About Your Tattoo
        </h3>

        <p className="tattoo-placement">Tattoo Placement</p>

        <div className="coverup-tattoo-design-option">
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

export default Transition(CoverupTattooDesignSelect)
