import "./style.css"
import colorTattooImg from "../../assets/Color.jpg"
import BlackandWhiteTattooImg from "../../assets/Black & White.jpg"
import { useNavigate } from "react-router-dom"
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar"
import SidebarButtonUi from "../../Components/SidebarButtonUi/SidebarButtonUi"
import { useDispatch } from "react-redux"
import { setCoverTattooColor } from "../../Redux/CoverUpTattooDetailSlice"
import { useState,useEffect, use } from "react"
import MainButtonUi from "../../Components/MainButtonUi/MainButtonUi"
import { useSelector } from "react-redux"

  const buttons = [
        { img: colorTattooImg, text: "Colored",value : "colored" },
        { img: BlackandWhiteTattooImg, text: "Black & White",value : "black_and_white"},
      
    ];
const CoverupTattooColorSelect = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const coverupTattooDetail = useSelector(state => state.coverupTattoo)
    const nextStep = () => navigate("/service/coverup-tattoo/book-appointment")
         useEffect(() => {
                  dispatch(setCoverTattooColor(buttons[selectedIndex].value))
              },[selectedIndex])
       
              useEffect(() => {
                 if(coverupTattooDetail.tattoo_size === "" || coverupTattooDetail.tattoo_placement === ""){
                    navigate("/service")
                 }
            },[])
   
  return (
    <div className="coverup-tattoo-color-select">
       <AppointmentTopBar title={"Coverup / Rework Tattoos"}/>

       <div className="coverup-tattoo-color-selection-detail">
        <h3>
            Tell Us About Your Tattoo
        </h3>

        <p className="tattoo-color">Preferred Color of Your Tattoo</p>

        <div className="coverup-tattoo-color-option">
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

export default CoverupTattooColorSelect
