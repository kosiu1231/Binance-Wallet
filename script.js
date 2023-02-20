let wsBTC = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
let wsETH = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
let wsDOG = new WebSocket('wss://stream.binance.com:9443/ws/dogeusdt@trade');
let wsBNB = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@trade');
let binanceBTCPrice = document.querySelector('#btcPrice');
let binanceETHPrice = document.querySelector('#ethPrice');
let binanceDOGPrice = document.querySelector('#dogPrice');
let binanceBNBPrice = document.querySelector('#bnbPrice');
let walletBTCBalance = document.querySelector('#walletBTCBal');
let walletETHBalance = document.querySelector('#walletETHBal');
let walletDOGBalance = document.querySelector('#walletDOGBal');
let walletBNBBalance = document.querySelector('#walletBNBBal');
walletBTCBalance.innerText = `${0.00693359}`
// walletETHBalance.innerText = `${0.00534452}`
// walletDOGBalance.innerText = `${0.00453452}`
// walletBNBBalance.innerText = `${0.00435242}`
let graphLabels = [];
let savedBTCPrices = [];
let savedETHPrices = [];
let savedDOGPrices = [];
let savedBNBPrices = [];
let stockBTCObject = {};
let stockETHObject = {};
let stockDOGObject = {};
let stockBNBObject = {};
let i = -20;

//dalej edytowac

wsBTC.onmessage = (e) => {
    // console.log(JSON.parse(e.data));
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

// function hoverOut(img)
// {
//     if(img.id = "ethNavButton")
//         img.src = 
// }

// btns = querySelectorAll('a');