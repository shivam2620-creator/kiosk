import "./style.css"
import flastTattooImg from "../../assets/flash-tattoo.png"

const FlashTattooDetails = ({details}) => {
  return (
        <div className="flash-tattoo-detail">
            <h3>Flash Tattoo Detail: </h3>
            <div className="flash-tattoo-detail-secton">
                <div className="flash-tattoo-detail-img-section">
                    <img src={details.img } alt="custom tattoo image" width="100%" height="100%"  />
                </div>
    
                <div className="flash-tattoo-details">
                    <h2>{details.tattooOption}</h2>
                    <div className="sub-flash-tattoo-detail">
                        <p>Size: <span>{details.size}</span></p>
                        {/* <p>color: {details.color}</p> */}
                    </div>
                    <p>Locaion: {details.location.name}</p>
                </div>
            </div>
          
        </div>
  )
}

export default FlashTattooDetails
