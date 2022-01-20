const TokenYieldFarm = artifacts.require('TokenYieldFarm')

module.exports = async function(callback) {
    let tokenYieldFarm = await TokenYieldFarm.deployed()
    await tokenYieldFarm.issueTokens()

    console.log("Tokens issued!")

    callback()
}