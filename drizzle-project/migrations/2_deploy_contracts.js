var Classifieds = artifacts.require("Classifieds")

module.exports = function(deployer) {
  deployer.deploy(Classifieds);
};
