import React from "react";
var QRCode = require("qrcode-svg");

function Pay({ responseData, setShowPayment }) {

  function change(e) {
    e.preventDefault();
    setShowPayment(false);
  }
  
  let qrCodeSvg = new QRCode(responseData['lightning_invoice']['payreq']).svg();
  
  return (
    <div className="paymentInfo">
      <h2>Pay with Lightning</h2>
      <div className="payment">
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCodeSvg)}`} />
      <br />
      <span>Lightning Invoice</span>
      <textarea disabled value={responseData['lightning_invoice']['payreq']}></textarea>
      <button onClick={e => change(e)}>Close Payment Screen</button>
      </div>
    </div>
  );
}

export default Pay;