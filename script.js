let wsBTC = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
let binanceBTCPrice = document.querySelector('#btcPrice');
let walletBTCBalance = document.querySelector('#walletBTCBal');
walletBTCBalance.innerText = `${0.00770339}`
let graphLabels = [];
let savedBTCPrices = [];
let stockBTCObject = {};
let i = -20;

wsBTC.onmessage = (e) => {
    stockBTCObject = JSON.parse(e.data);
    
    binanceBTCPrice.innerText = "$" + (parseFloat(stockBTCObject.p).toFixed(2));
    document.querySelector('#walletPrice').innerText = "$" + (walletBTCBalance.innerText *stockBTCObject.p).toFixed(2);
}

setInterval(() => {
    if(!isNaN(stockBTCObject.p))
    {
        savedBTCPrices.push(parseFloat(stockBTCObject.p).toFixed(2));
        if(savedBTCPrices.length <= 20)
        {
            graphLabels.push(`${i}s`);
            i++;
        }
    }
    if(savedBTCPrices.length > 20)
    {
        savedBTCPrices.shift();
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
        data: savedBTCPrices,
        borderWidth: 3,
        borderColor: 'rgb(242, 169, 0)',
        tension: 0.3,
        animation: false
        }]
    },
    options: {
        scales: {
            x: {
            //align: 'inner'
            }
        }
    }
});