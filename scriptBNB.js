let wsBNB = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@trade');
let binanceBNBPrice = document.querySelector('#bnbPrice');
let walletBNBBalance = document.querySelector('#walletBNBBal');
walletBNBBalance.innerText = `${0.00435242}`
let graphLabels = [];
let savedBNBPrices = [];
let stockBNBObject = {};
let i = -20;

wsBNB.onmessage = (e) => {
    stockBNBObject = JSON.parse(e.data);
    
    binanceBNBPrice.innerText = "$" + (parseFloat(stockBNBObject.p).toFixed(2));
    document.querySelector('#walletPrice').innerText = "$" + (walletBNBBalance.innerText *stockBNBObject.p).toFixed(2);
}

setInterval(() => {
    if(!isNaN(stockBNBObject.p))
    {
        savedBNBPrices.push(parseFloat(stockBNBObject.p).toFixed(2));
        if(savedBNBPrices.length <= 20)
        {
            graphLabels.push(`${i}s`);
            i++;
        }
    }
    if(savedBNBPrices.length > 20)
    {
        savedBNBPrices.shift();
    }
    chart.update();
}, 1000);

const ctx = document.getElementById('myChart');

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: graphLabels,
        datasets: [{
        label: 'Binance Coin Price',
        data: savedBNBPrices,
        borderWidth: 3,
        borderColor: 'rgb(243, 186, 47)',
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