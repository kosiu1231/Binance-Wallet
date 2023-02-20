let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
let binancePrice = document.querySelector('#btcPrice');
let walletBalance = document.querySelector('#walletBal');
walletBalance.innerText = `${0.00693359}`
let graphLabels = [];
let savedPrices = [];
let stockObject = {};
let i = -20;

ws.onmessage = (e) => {
    // console.log(JSON.parse(e.data));
    stockObject = JSON.parse(e.data);
    
    binancePrice.innerText = "$" + (parseFloat(stockObject.p).toFixed(2));
    document.querySelector('#walletPrice').innerText = "$" + (walletBalance.innerText *stockObject.p).toFixed(2);
}

setInterval(() => {
    if(!isNaN(stockObject.p))
    {
        savedPrices.push(parseFloat(stockObject.p).toFixed(2));
        if(savedPrices.length <= 20)
        {
            graphLabels.push(`${i}s`);
            i++;
        }
    }
    if(savedPrices.length > 20)
    {
        savedPrices.shift();
    }
    chart.update();
}, 1000);

const ctx = document.getElementById('myChart');

  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: graphLabels,
      datasets: [{
        label: 'Bitcoin Price',
        data: savedPrices,
        borderWidth: 3,
        borderColor: 'rgb(242, 169, 0)',
        tension: 0.3,
        animation: false
      }]
    },
    options: {
      scales: {
        x: {
            align: 'inner'
        }
      }
    }
  });