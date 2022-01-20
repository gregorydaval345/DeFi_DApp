import React, { Component, useState } from 'react'
import './App.css';
import {Header} from './Header.js';
import WalletCard from './WalletCard';
import WalletCardEthers from'./WalletCardEthers';
import {ErrorBoundary, useErrorHandler} from 'react-error-boundary';


function App() {

  const [depositValue, setDepositValue] = useState("");
  const[depositBalance, setDepositBalance] = useState("");
  const[withdrawValue, setWithdrawValue] = useState("");
  const[depositStatement, setDepositStatement] = useState("");
  const[viewStatement, setViewStatement]= useState("")
  const[withdrawStatement, setWithdrawStatement] = useState("");
  const[depositError, setDepositError] = useState("");
  const[withdrawError, setWithdrawError] = useState("");
  const handleError = useErrorHandler();
  const[loadingDeposit, setLoadingDeposit] = useState(false);
  const[loadingWithdraw, setLoadingWithdraw] = useState(false);

  let provider;
  let accounts;
  let contract;
  let web3;

  function initStatement() {
    setDepositBalance("")
    setDepositStatement("")
    setWithdrawStatement("")
    setERC20DepositStatement("")
    setERC20ApproveStatement("")
    setERC20WithdrawStatement("")
  }

  async function fetchETHDepositBalance() {
    initStatement();

    if(typeof window.ethereum!== 'undefined'){
     // await requestAccount();
        try {
          await contract.methods.getBalanceInWei(accounts[0]).call({from:accounts[0]})
          .then((result) => {
            setDepositBalance(Math.trunc(Number(web3.utils.fromWei(result.toString()))*1e5)/1e5);
            isNaN(depositBalance) || !depositBalance ? setViewStatement("You have 0 ETH balance. Deposit ETH and start earning interest today.") : setViewStatement(`You have a balance of ${Number.parseFloat(depositBalance).toFixed(10)} ETH`)
          });
         
        } catch (err) {
          handleError(err);
          setViewStatement(`Unable to view deposit amount`);
        }
      }
    }

    function validateAddress(address) {
      try {
        // eslint-disable-next-line
        const addr = web3.utils.toChecksumAddress(address);
        return true;
      } catch(error) {
        console.log(error)
        return false;
      }
    }
    
    //ETH deposit
  const handleETHDepositValueChange = async (e) =>{
    e.preventDefault();
    setLoadingDeposit(true);
    initStatement();

    if(typeof window.ethereum!== 'undefined'){
      //await requestAccount();
      let depositAmount;
      try {
        if(isNaN(depositValue) || depositValue<=0) {
          setLoadingDeposit(false)
          setDepositError("Please enter a positive number only");
          return;
        } else {
          depositAmount = web3.utils.toWei(depositValue, 'ether');
          setDepositError("")
        }

      } catch (error) {
        handleError(error);
        console.log(error);
      }

      try{
        setDepositError("")
        await contract.methods.addBalance().send({value:depositAmount.toString(), from: accounts[0]})
        .on('receipt', async() => {
          await contract.methods.getBalanceInWei(accounts[0]).call({from: accounts[0]})
          .then((result) => {
            setLoadingDeposit(false)
            setDepositStatement(`You have deposited ${Number.parseFloat(depositValue).toFixed(10)} ETH`)
            setDepositBalance(Math.trunc(Number(web3.utils.fromWei(result.toString()))*1e5)/1e5);
          })
        })

      } catch (error) {
        handleError(error)
        setLoadingDeposit(false)
        setDepositStatement(`Unable to deposit amount. Connect your wallet and try again. Make sure you have sufficient amount in your wallet.`)
      }
      setLoadingDeposit(false)
      setDepositValue(""); 
      
    }
  }

    // ETH withdraw
    const withdrawDeposit = async (e) => {
      e.preventDefault();
      setLoadingWithdraw(true)
      initStatement();
      if(typeof window.ethereum!== 'undefined'){
        //await requestAccount();
        
        let withdrawAmount;
        try {
          if(isNaN(withdrawValue) || withdrawValue<=0) {
            setLoadingWithdraw(false)
            setWithdrawError("Please enter number only");
            return;
            } else {
            withdrawAmount = web3.utils.toWei(withdrawValue,'ether');
            setWithdrawError("")
          }
  
        } catch (error) {
          setWithdrawStatement(`Unable to withdraw. Make sure you have sufficient balance.`)
          console.log(error);
          return;
        }
  
        try {
            setWithdrawError("")
            await contract.methods.withdraw(withdrawAmount).send({from:accounts[0]})
            .on('receipt', async () => {
              await contract.methods.getBalanceInWei(accounts[0]).call({from: accounts[0]})
              .then((result) =>{
                const balance = Number.parseFloat(web3.utils.fromWei(result.toString())).toFixed(10);
                setLoadingWithdraw(false)
                setWithdrawStatement(`You have withdrawn ${Number.parseFloat(withdrawValue).toFixed(10)} amount of ETH. You have ${Number.parseFloat(Math.trunc(Number(balance)*1e5)/1e5).toFixed(10)} ETH balance remaining.`)
              })
            });
          } catch (err) {
            console.log(err)
            setLoadingWithdraw(false)
            setWithdrawStatement(`Unable to withdraw. Make sure you have sufficient balance.`)
          }
          setLoadingWithdraw(false)
          setWithdrawValue("")
        }
    }


  return (
    <div className="App">
      <Header/>
    <WalletCard/>
    <WalletCardEthers/>


    <div className = "container">
            <h4>Deposit ETH and Start Earning Interest Today! </h4>
            <button onClick = {fetchETHDepositBalance}>
              View ETH Deposit Balance
            </button>
            <p>{viewStatement}</p>
     
            <form onSubmit={handleETHDepositValueChange}>
              <div>
                  
                  <label> Deposit Amount: </label>
                  <input type = 'text' required value={depositValue} onChange={(e) => {setDepositValue(e.target.value)}} placeholder={"Example ETH: 1.89"}/>
                  <input type="submit" value ="Add ETH"/>
                  {loadingDeposit? (<p>Please wait...</p>): (<p>{depositStatement}</p>)}
                  <p>{depositError}</p>
              </div>

            </form>

            <form onSubmit={withdrawDeposit}>
              <div>
                  <label> Withdraw Amount: </label>
                  <input type = 'text' required value={withdrawValue} onChange={(e) => {setWithdrawValue(e.target.value)}} placeholder="Example ETH: 1.89"/>
                  <input type="submit" value ="Withdraw ETH"/>
                  {loadingWithdraw? (<p>Please wait...</p>): (<p>{withdrawStatement}</p>)}
                  <p>{withdrawError}</p>
              </div>
            </form>
            <br/>
            <br/>
        </div>

    </div>
  );
}

export default App;
