const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("MarketActions", () => {
  let buyer, seller;
  let carsMarket, marketActions;

  beforeEach(async () => {
    [buyer, seller, inspector, lender] = await ethers.getSigners();

    // Deploy Cars market
    const CarsMarket = await ethers.getContractFactory("CarsMarket");
    carsMarket = await CarsMarket.deploy();

    // Mint - add json metadata
    let transaction = await carsMarket.connect(seller).mint("");
    await transaction.wait();

    const MarketActions = await ethers.getContractFactory("MarketActions");
    marketActions = await MarketActions.deploy(
      carsMarket.address,
      seller.address,
      inspector.address,
      lender.address
    );
  });

  describe("Deployment", () => {
    it("Returns NFT address", async () => {
      const result = await marketActions.nftAddress();
      expect(result).to.be.equal(carsMarket.address);
    });

    it("Returns seller", async () => {
      const result = await marketActions.seller();
      expect(result).to.be.equal(seller.address);
    });

    it("Returns inspector", async () => {
      const result = await marketActions.inspector();
      expect(result).to.be.equal(inspector.address);
    });

    it("Returns lender", async () => {
      const result = await marketActions.lender();
      expect(result).to.be.equal(lender.address);
    });
  });
});

// consider changing contract name from carsMarket to carFromMarket
