let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
let binancePrice = document.querySelector('#btcPrice');
walletBalance = document.querySelector('#walletBal');
walletBalance.innerText = `${0.00693359}`

ws.onmessage = (e) => {
    // console.log(JSON.parse(e.data));
    let stockObject = JSON.parse(e.data);
    binancePrice.innerText = stockObject.p;
    document.querySelector('#walletPrice').innerText = "$" + (walletBalance.innerText * stockObject.p).toFixed(2);
}

