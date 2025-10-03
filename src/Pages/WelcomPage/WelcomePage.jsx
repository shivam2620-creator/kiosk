import React from 'react'
import tattooImg from "../../assets/tattoo.jpg"
import piercingImg from "../../assets/piercing.jpg"
import OptionUi from '../../Components/OptionUi/OptionUi'
import { useNavigate } from 'react-router-dom'
import Transition from '../../Transition'
import "./style.css"

const options = [
    {
        img : tattooImg,
        subTitle : "TATTOO"
    },
    {
        img: piercingImg,
        subTitle : "PIERCING"
    }
]

const WelcomePage = () => {
    const navigate = useNavigate();
    const options = [
    {
        img : tattooImg,
        subTitle : "TATTOO", 
        click : () => navigate("/tattoo-options")
    },
    {
        img: piercingImg,
        subTitle : "PIERCING",
        click: () => navigate("/piercing/select-booking")
    }
]
  return (
    <div className="welcome-page">
  
       <div className="welcome-page-title">
           <h1>Ready To Book?</h1>
           <p>
                Start With <span>Tattoo</span> or <span>Piercing</span>
           </p>
       </div>

       <div className="welcome-page-options">
           {options.map((opt,indx) => {
            return  <OptionUi  img={opt.img} key={indx} subTitle={opt.subTitle} navigate ={opt.click}/>
           })}
       </div>
      
    </div>
  )
}

export default Transition(WelcomePage)
