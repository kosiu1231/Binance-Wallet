let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
let binancePrice = document.querySelector('#btcPrice');
walletBalance = document.querySelector('#walletBal');
walletBalance.innerText = `${0.00693359}`
let savedPrices = [];
let stockObject = {};


ws.onmessage = (e) => {
    // console.log(JSON.parse(e.data));
    stockObject = JSON.parse(e.data);
    
    binancePrice.innerText = "$" + (parseFloat(stockObject.p).toFixed(2));
    document.querySelector('#walletPrice').innerText = "$" + (walletBalance.innerText *stockObject.p).toFixed(2);
}

setInterval(() => {
    if(!isNaN(stockObject.p))
        savedPrices.push(parseFloat(stockObject.p).toFixed(2));
    if(savedPrices.length > 20)
        savedPrices.shift();
        chart.update();
}, 1000);

const ctx = document.getElementById('myChart');

  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['-19 s', '-18 s', '-17 s', '-16 s', '-15 s', '-14 s', '-13 s', '-12 s', '-11 s', '-10 s', '-9 s', '-8 s', '-7 s', '-6 s', '-5 s', '-4 s', '-3 s', '-2 s', '-1 s', '0 s'],
      datasets: [{
        label: 'Bitcoin Price',
        data: savedPrices,
        borderWidth: 3,
        borderColor: 'rgb(242, 169, 0)',
        hoverBackgroundColor: 'rgb(242, 169, 0)',
        tension: 0.3,
        animation: false
      }]
    },
    options: {
      scales: {
        y: {
        //   beginAtZero: true
        }
      }
    }
  });