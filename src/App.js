import './App.css';
import { useState } from 'react';
import New from './New';
import Pay from './Pay';

function App() {
  const [showPayment, setShowPayment] = useState(false);
  const [isError, setIsError] = useState(false);
  const [responseData, setResponseData] = useState({});

  const transmit = e => {
    e.preventDefault();
    let message = e.target[0].value;
	  let bid = e.target[1].value;
    if (message === null || message === '' || bid === '' || bid === null) {
      return false;
    }
	  let url = "https://api.blockstream.space/order";
    let transmission = new XMLHttpRequest();
    transmission.open("POST", url);
    transmission.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    transmission.onload = function() {
      if (transmission.status !== 200) {
        setResponseData(JSON.parse(transmission.responseText));
        setIsError(true);
      } else {
        setResponseData(JSON.parse(transmission.responseText));
        setIsError(false);
        setShowPayment(true);
      }
    }
    var data = "bid="+bid+"&message="+message;
    transmission.send(data);
  }


  return (
    <div className="App">
      
      {!showPayment ? (
        <New transmit={transmit} isError={isError} />
      ) : "" }

      {
      Object.keys(responseData).length !== 0 &&
      showPayment ? (
        <Pay 
          responseData={responseData}
          setShowPayment={setShowPayment}
        />
      ) : "" }
    </div>
  );
}

export default App;
