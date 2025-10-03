import './style.css';

export default function MainButton({ img, subTitle, navigate,openScanner }) {
  return (
    <div className="main-button" onClick={() => navigate?.() || openScanner?.()} >
      <div className="main-button-inner">
        <div className="img-text-container">
            <div className="img-container">
                 <img className={`main-button-img`} src={img} alt={subTitle} />
            </div>
         
          <p className="main-button-text">{subTitle}</p>
        </div>
      </div>
    </div>
  )
}