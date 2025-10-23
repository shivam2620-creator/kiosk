import "./style.css"
import flash_color_img from "../../assets/flash_color.png"
import flash_black_white_img from "../../assets/flash_black_white.png"
import { useNavigate } from "react-router-dom"
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar"
import { useDispatch } from "react-redux"
import { setFlashTattooColor } from "../../Redux/FlashTattoDetailSlice"
import { useState,useEffect, use } from "react"
import MainButtonUi from "../../Components/MainButtonUi/MainButtonUi"
import { useSelector } from "react-redux"

  const buttons = [
        { img: flash_color_img, text: "Colored",value : "coloured" },
        { img: flash_black_white_img, text: "Black & White", value : "black_only"},
      
    ];
const FlashTattooColorSelect = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const falshTattooDetail = useSelector(state => state.flashTattoo)
    const nextStep = () => navigate("/service/flash-tattoo/book-appointmen")
         useEffect(() => {
                  dispatch(setFlashTattooColor(buttons[selectedIndex].text))
              },[selectedIndex])
       
              useEffect(() => {
                 if(!falshTattooDetail.isActive){
                    navigate("/service")
                 }
            },[])
   
  return (
    <div className="flash-tattoo-color-select">
       <AppointmentTopBar title={"Flash Tattoo"}/>

       <div className="flash-tattoo-color-selection-detail">
        <h3>
            Tell Us About Your Tattoo
        </h3>

        <p className="flash-tattoo-color">Preferred Color of Your Tattoo</p>

        <div className="flash-tattoo-color-option">
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

export default FlashTattooColorSelect
