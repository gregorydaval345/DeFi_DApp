const { assert } = require('chai');

const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenYieldFarm = artifacts.require('TokenYieldFarm')

require('chai')
    .use(require('chai-as-promised'))
    .should()

    function tokens(n) {
        return web3.utils.toWei(n, 'ether');
    }

contract('TokenYieldFarm', ([owner, investor]) => {
    let daiToken, dappToken, tokenYieldFarm

    before(async () => {
        // Load Contracts
         daiToken = await DaiToken.new()
         dappToken = await DappToken.new()
         tokenYieldFarm = await TokenYieldFarm.new(dappToken.address, daiToken.address)

         // Transfer all Dapp tokens to the token yield farm
         await dappToken.transfer(tokenYieldFarm.address, tokens('1000000'))

         // Send tokens to investor
         await daiToken.transfer(investor, tokens('100'), { from: owner })
    })
    

    describe('Mock Dai deployment', async () => {
        it('has a name', async () => {
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Dapp Token deployment', async () => {
        it('has a name', async () => {
            const name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })
    })

    describe('Token Yield Farm deployment', async () => {
        it('has a name', async () => {
            const name = await tokenYieldFarm.name()
            assert.equal(name, 'DApp Token Yield Farm')
        })
    })

    it('contract has tokens', async () => {
        let balance = await dappToken.balanceOf(tokenYieldFarm.address)
        assert.equal(balance.toString(), tokens('1000000'))
    })


    describe('Farming tokens', async () => {
        it('rewards investors for staking mDai tokens', async () => {
            let result

            // Check investor balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')

            // Stake faker DAI Tokens
            await tokenYieldFarm.stakeTokens(tokens('100'), { from: investor })
        })
    })









})
