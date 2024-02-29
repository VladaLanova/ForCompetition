const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');

async function sendETH() {
  const privateKey = '0xbc84e904dc18b0931df5ddcfaae4bdf4453a3c19d1d02b89e884599b93deb1ea'; 
  const wallet = new ethers.Wallet(privateKey, provider);

  const toAddress = '0x73F028E0e69745114E634e9d1c32f4c1640A77Fa'; 

  const transaction = {
    to: toAddress,
    value: ethers.utils.parseEther('2.0'), 
  };

  const tx = await wallet.sendTransaction(transaction);
  console.log('Transaction hash:', tx.hash);
}

sendETH();