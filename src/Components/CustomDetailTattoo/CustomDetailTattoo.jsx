import CustomTattooImg from "../../assets/Traditional.png"
import "./style.css"

const CustomTattooDetail = ({details}) => {
  return (
    <div className="custom-tattoo-detail">
        <h3>Custom Tattoo Detail: </h3>
        <div className="custom-tattoo-detail-secton">
            <div className="custom-tattoo-detail-img-section">
                <img src={CustomTattooImg} alt="custom tattoo image" width="100%" height="100%"  />
            </div>

            <div className="custom-tattoo-details">
                <h2>Custom Tattoo</h2>
                <p> <span>Tattoo Option:</span> {details.tattooOption}</p>
                <p><span>Size of Tattoo:</span> {details.size}</p>
            </div>
        </div>
      
    </div>
  )
}

export default CustomTattooDetail
