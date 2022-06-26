import React, { useState } from "react";

function New({ transmit, isError }) {
  const [recBid, setRecBid] = useState("");

  const bidRec = e => {
    let thisLen = new TextEncoder('utf-8').encode(e.target.value).length
		let lowBid = parseInt(thisLen)*50;
		let lowBidSats = lowBid/1000;
		if (lowBid < 1000){
			setRecBid("Min bid: 1000 (1 sats)");
		} else {
			setRecBid("Min bid: " + lowBid + " (" + lowBidSats + " sats)");
		}
    if (thisLen === 0) {
      setRecBid("");
    }
  }

  return(
    <form onSubmit={e => transmit(e)}>
        <h2>New Broadcast</h2>
        {isError ? (
          <p className="error">
            Bid too low!
          </p>
        ) : ""}
        <textarea name="msg" placeholder="Enter your message" onKeyUp={e => bidRec(e)}></textarea>
        <br/>
        {recBid !== "" ? (
        <p className="bidRec">
          {recBid}
        </p>
        ) : "" }
        <input name="bid" placeholder="Bid amount in msats" />
        <br/>
        <button type="submit">Send to Space</button>
      </form>
  );
}

export default New;