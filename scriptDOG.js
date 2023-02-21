let wsDOG = new WebSocket('wss://stream.binance.com:9443/ws/dogeusdt@trade');
let binanceDOGPrice = document.querySelector('#dogPrice');
let walletDOGBalance = document.querySelector('#walletDOGBal');
walletDOGBalance.innerText = `${1345}`
let graphLabels = [];
let savedDOGPrices = [];
let stockDOGObject = {};
let i = -20;

wsDOG.onmessage = (e) => {
    stockDOGObject = JSON.parse(e.data);
    
    binanceDOGPrice.innerText = "$" + (parseFloat(stockDOGObject.p).toFixed(5));
    document.querySelector('#walletPrice').innerText = "$" + (walletDOGBalance.innerText *stockDOGObject.p).toFixed(2);
}

setInterval(() => {
    if(!isNaN(stockDOGObject.p))
    {
        savedDOGPrices.push(parseFloat(stockDOGObject.p).toFixed(5));
        if(savedDOGPrices.length <= 20)
        {
            graphLabels.push(`${i}s`);
            i++;
        }
    }
    if(savedDOGPrices.length > 20)
    {
        savedDOGPrices.shift();
    }
    chart.update();
}, 1000);

const ctx = document.getElementById('myChart');

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: graphLabels,
        datasets: [{
        label: 'Doge Price',
        data: savedDOGPrices,
        borderWidth: 3,
        borderColor: 'rgb(203,152,0)',
        tension: 0.3,
        animation: false
        }]
    },
    options: {
        scales: {
            y: {
                precision: 5
            }
        }
    }
});