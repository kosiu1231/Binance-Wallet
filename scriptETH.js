let wsETH = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
let binanceETHPrice = document.querySelector('#ethPrice');
let walletETHBalance = document.querySelector('#walletETHBal');
walletETHBalance.innerText = `${0.00534452}`
let graphLabels = [];
let savedETHPrices = [];
let stockETHObject = {};
let i = -20;

wsETH.onmessage = (e) => {
    stockETHObject = JSON.parse(e.data);
    
    binanceETHPrice.innerText = "$" + (parseFloat(stockETHObject.p).toFixed(2));
    document.querySelector('#walletPrice').innerText = "$" + (walletETHBalance.innerText *stockETHObject.p).toFixed(2);
}

setInterval(() => {
    if(!isNaN(stockETHObject.p))
    {
        savedETHPrices.push(parseFloat(stockETHObject.p).toFixed(2));
        if(savedETHPrices.length <= 20)
        {
            graphLabels.push(`${i}s`);
            i++;
        }
    }
    if(savedETHPrices.length > 20)
    {
        savedETHPrices.shift();
    }
    chart.update();
}, 1000);

const ctx = document.getElementById('myChart');

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: graphLabels,
        datasets: [{
        label: 'Ethereum Price',
        data: savedETHPrices,
        borderWidth: 3,
        borderColor: 'rgb(201, 157, 102)',
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