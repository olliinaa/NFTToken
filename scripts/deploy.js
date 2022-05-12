const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const NFTToken = await hre.ethers.getContractFactory("NFTToken");
  const nFTToken = await NFTToken.deploy();

  await nFTToken.deployed();

  console.log("NFTToken deployed to:", nFTToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
