import React from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import "./style.css"

const QrScanner = ({close}) => {
  return (
    <div className="qr-scanner-overlay">
          <div className="scanner-box">
            <Scanner
              onScan={(results) => {
                if (results && results[0]) {
                  const code = results[0].rawValue;
                  setScannedResult(code);
                  setShowScanner(false);
                  navigate(`/booking/${code}`);
                }
              }}
              onError={(error) => console.error("QR Scanner Error:", error)}
              constraints={{ facingMode: "environment" }}
              components={{ audio: true, finder: false }}
              className="qr-scanner"
            />
            <div className="custom-frame"></div>
          </div>

          <p className="scan-instruction">Align QR code inside the frame</p>

          <button
            className="cancel-button"
            onClick={close}
          >
            Cancel
          </button>
        </div>
  )
}

export default QrScanner
