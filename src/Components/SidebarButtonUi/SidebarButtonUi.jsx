import "./style.css"
import { useContinue } from "../../Provider/ContinueContext"
import { useEffect } from "react";

const SidebarButtonUi = ({key,service,selectedService,isSeleted,setSelectedIndex,nextStep}) => {
  const {setOnContinue} = useContinue();
  useEffect(() => {
        setOnContinue(nextStep);
  },[setOnContinue])


  return (
    <button
                        key={key}
                        className={`service-button ${selectedService && selectedService === service.service  || isSeleted ? "selected" : ""}`}
                        onClick={() => {
                          service.click?.()
                          setSelectedIndex(); 
                         
                          }}>
                        <img src={service.img} alt={service.text} />
                        <p>{service.text}</p>
    </button>
  )
}

export default SidebarButtonUi
