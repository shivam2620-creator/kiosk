import "./style.css"
import customTattooImg from "../../assets/tattoo.jpg"
import flashTattooImg from "../../assets/flash-tattoo.png"
import coverTattooImg from "../../assets/cover-tattoo.jpg"
import OptionUi from '../../Components/OptionUi/OptionUi'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setFlashTattooIsActive } from "../../Redux/FlashTattoDetailSlice"
import { setCustomTattooIsActive } from "../../Redux/CustomTattooDetailSlice"
import Transition from "../../Transition"
import { useEffect } from "react"





const TattooOptionPick = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const options = [
    {
        img :customTattooImg ,
        subTitle : "CUSTOM TATTOO",
        click : () => navigate("/custom-tattoo/select-booking")
    },
    {
        img : flashTattooImg,
        subTitle : "FLASH TATTOO",
         click : () => navigate("/flash-tattoo/select-booking")
    },
    {
        img : coverTattooImg,
        subTitle : "COVERUP / REWORK TATTOO",
         click : () => navigate("/coverup-tattoo/select-booking")
    }
        ]

        useEffect(() => {
            dispatch(setFlashTattooIsActive(false))
            dispatch(setCustomTattooIsActive(false));
        },[])
  return (
    <div className="tattoo-option-pick-page">
      
           <div className="tattoo-option-pick-page-title">
               <h1>YOU'VE GOT OPTIONS</h1>
               <p>
                    Custom Tattoo, Flash Tattoo, Cover-Up & Re-Works
               </p>
           </div>
    
           <div className="tattoo-option-pick-options">
               {options.map((opt,indx) => {
                return  <OptionUi  
                           img={opt.img} 
                           key={indx} 
                           subTitle={opt.subTitle} 
                           navigate={opt.click}
                           
                           />
               })}
           </div>
          
        </div>
  )
}

export default Transition(TattooOptionPick)
