const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenYieldFarm = artifacts.require('TokenYieldFarm')



module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token:
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()


  // Deploy DApp Token:
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()


  // Deploy TokenFarm
  await deployer.deploy(TokenYieldFarm, dappToken.address, daiToken.address)
  const tokenYieldFarm = await TokenYieldFarm.deployed()

  //Transfer all tokens to TokenFarm (1 million)
  await dappToken.transfer(tokenYieldFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '1000000000000000000000000')

}
