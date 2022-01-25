# DeFi_DApp
DeFi yield farming DApp

Building a Escrow smart contract with a few custom features:

- ERC20, ERC721, ERC1155 support
- Yield farming (deposits accruing interest)
- Governance/upgradability support
- Access control or multisig features for pooled assets

These should have tests built using Hardhat and documentation done using NatSpec.

# About
This DApp provides ETH and ERC20 tokens deposit and withdrawal services to users. User's deposit will earn an interest from other established protocols such as Compound. Users should be aware that ERC20 tokens which are deposited will be converted into ETH and earn interest. Users can choose to withdraw the balances as ETH or any other ERC20 tokens.

The DApp interacts with established protocols such as Compound and Uniswap for token swaps and earning interest. It also uses Openzeppelin contracts and libraries such as ERC20, ReentrancyGuard and Address.

The contract is deployed and verified on the Rinkeby testnet at 0x0eaee27d1cdbaF249dAb7B1CcBdDeAFCB5Ae86eB

# Dependencies
To run the DApp in a local environment, the following dependencies are required:

Node v14.15.0
download Node: https://nodejs.org/en/download/
Truffle v5.4.17
Truffle: npm i -g truffle
HDWallet provider: npm i @truffle/hdwallet-provider
Contract verification: npm i truffle-plugin-verify
Ganache-cli: npm i ganache-cli
Openzeppelin contracts and libraries: npm i @openzeppelin/contracts
# Front end
React: npm i -g react
React-bootstrap: npm i react-bootstrap
Bootstrap: npm i bootstrap
React Error Boundary: npm i react-error-boundary
Web3
web3js: npm i -g web3
ethers: npm i -g ethers
Metamask: npm i @metamask/detect-provider
Install metamask wallet in your browser
Utils
.env file: npm i dotenv
How to Interact with the DApp
There are 3 ways to interact with this DApp.

Interact through publicly deployed web interface
Go to: https://smartbank.vercel.app/
If you do not have a Metamask browser extension, install Metamask in your browser. Connect your Metamask wallet and start interacting with the app.
Interact through local network
Download this folder
Run cd blockchain-developer-bootcamp-final-project-master which is the root directory
Run npm install to install all the dependencies in the package.json file
Launch the user interface via port: 3000 by running the following command in the root directory npm run start
Access the user interface via http://localhost:3000
If you do not have Metamask browser extension, install Metamask in your browser. Connect your Metamask wallet and start interacting with the app.
Interact via Etherscan
You may also choose to interact with the SmartBank contract via Etherscan Rinkeby.
Directory Structure
Key files and folders structures are as below:

blockchain-developer-bootcamp-final-project-master (root directory)
+-- migrations
|   +-- 1_initial_migration.js
|   +-- 2_deploy_contracts.js 
|
+-- public
|
+-- src
|   +-- abis
|   +-- Component
|   |   +-- Header.js
|   |   +-- MetamaskConnectButton.js
|   |   +-- Fallback.js
|   |
|   +-- contracts
|   |   +-- Migrations.sol
|   |   +-- SmartBank.sol    
|   |
|   +-- App.js
|   +-- App.css
|   +-- index.css
|   +-- index.js
|
+-- test
|   +-- SmartBank.test.js    
|
+-- truffle-config.js
+-- package.json
+-- .env.example
+-- avoiding_common_attacks.md
+-- design_pattern_decisions.md
+-- deployed_address.txt

# Contracts

Contract is compiled using Solidity compiler 0.8.0 and consists of the following key functions:
addBalance
Purpose: for users to deposit ETH to the contract which will earn interest from Compound
Input: deposit amount (specified as msg.value)
Output: return true on successful execution, emit depositETH event
addBalanceERC20
Purpose: for users to deposit ERC20 token which will then be converted to ETH and earn interest from Compound
Input: ERC20 token address, deposit amount
Output: return true on successful execution, emit depositERC20Token event
getBalanceInWei
Purpose: read-only function to view a user's balance in ETH terms
Input: user address
Output: total balance including interest in ETH terms
withdraw
Purpose: for users to withdraw balance from the contract in ETH; "nonReentrant" is applied to prevent reentrancy
Input: withdraw amount
Output: return true on successful execution, emit withdrawETH event
withdrawInERC20
Purpose: for users to withdraw balance from the contract in an ERC20 token; "non-Reentrant" is applied to prevent reentrancy
Input: withdraw amount in ETH terms, ERC20 token address
Output: return true on successful execution, emit withdrawERC20Token event
You can deploy the SmartBank contract to the Rinkeby network by running the following command. Make sure you have sufficient ETH balance to pay for the gas fee.
truffle migration --reset --network rinkeby
The deployment of the contract will require the following dependencies and modifications of default settings:
Constructor inputs are specified in migrations/2_deploy_contracts.js. More details in Migration section below.
Network configuration is specified in truffle-config.js. More details in Truffle Configuration below.
HDWallet provider - install via npm i -g @truffle/hdwallet-provider
Network provider - create an account with Infura/Alchemy and get the provider URL
Fill in the .env.example file with the necessary account and network provider details
Due to the contracts and abi folder residing in src folder, you have to modify the default Truffle directory in truffle-config.js, as below:
contracts_directory: './src/contract/',
contracts_build_directory: './src/abis',
migrations_directory: './migrations'
