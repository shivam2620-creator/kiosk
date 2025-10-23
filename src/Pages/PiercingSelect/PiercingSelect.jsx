import "./style.css"
import lipPiercingImg from "../../assets/lip-piercing.png"
import bellyPiercingImg from "../../assets/belly-piercing.png"
import earPiercingImg from "../../assets/ear-piercing.png"
import eyebrowPiercingImg from "../../assets/eyebrow-piercing.png"
import nosePiercingImg from "../../assets/nose-piercing.png"
import septumPiercingImg from "../../assets/septum-piercing.png"
import { useNavigate } from "react-router-dom"
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar"
import SidebarButtonUi from "../../Components/SidebarButtonUi/SidebarButtonUi"
import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPiercingType } from "../../Redux/PiercingSlice"
import { setPiercingImg } from "../../Redux/PiercingSlice"
import { setPiercingIsActive } from "../../Redux/PiercingSlice"
import { resetFlashTattooValue } from "../../Redux/FlashTattoDetailSlice"
import { resetCoverupTattooValue } from "../../Redux/CoverUpTattooDetailSlice"
import { resetCustomTattooValue } from "../../Redux/CustomTattooDetailSlice"
import MainButtonUi from "../../Components/MainButtonUi/MainButtonUi"
import Transition from "../../Transition"
    const buttons = [
        { img: lipPiercingImg,text: "Lip Piercing"},
        { img: bellyPiercingImg,text: "Belly Piercing"},
        {img: earPiercingImg,  text: "Ear Piercing" },
        {img: eyebrowPiercingImg, text: "Eyebrow Piercing"},
        { img: nosePiercingImg, text: "Nose Piercing"},
        {img: septumPiercingImg,text: "Septum Piercing"},
      ];

const PiercingSelect = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nextStep = () => navigate("/service/piercing/book-appointment")
    useEffect(() => {
                  dispatch(setPiercingType(buttons[selectedIndex].text))
                  dispatch(setPiercingIsActive(true))
                  dispatch(setPiercingImg(buttons[selectedIndex].img))
                  dispatch(resetCoverupTattooValue())
                  dispatch(resetCustomTattooValue())
                  dispatch(resetFlashTattooValue());
              },[selectedIndex])


  return (
    <div className="piercing-select">
       <AppointmentTopBar title={"Piercing"}/>

       <div className="piercing-select-detail">
        <h3>
            Pick the Piercing You Want
        </h3>


        <div className="piercing-option">
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

export default Transition(PiercingSelect)
