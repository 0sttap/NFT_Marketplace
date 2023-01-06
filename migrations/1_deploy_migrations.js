const PatsoPlaceNFT = artifacts.require('PatsoPlaceNFT')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(PatsoPlaceNFT, 'PatsoPlace', 'PLCE', 10, '0xbCAe8fb7A84f437d15760779897bfCB11E5AA969')
}
