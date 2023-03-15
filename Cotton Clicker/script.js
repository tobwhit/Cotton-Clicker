// Setup Variables
let cottonAmount = 0;
let clickPower = 1;
let cpsAmount = 0;

const cps = document.querySelector("#cps");
const counter = document.querySelector("#counter");
const imgCotton = document.querySelector("#btn-cotton");
const body = document.getElementById("#body");

// Info Box selectors
const infoBox = document.querySelector("#infoBox");
const infoOwned = document.querySelector("#infoOwned");
const infoPower = document.querySelector("#infoPower");
const infoTotalPower = document.querySelector("#infoTotalPower");
const infoTitle = document.querySelector("#infoTitle");

class Upgrade {
  constructor({
    numOwned,
    numPrice,
    numPriceMultiplier,
    numPower,
    numTotalPower,
    elem,
    elemOwned,
    elemPrice,
  }) {
    this.buy = this.buy.bind(this);
    this.numOwned = numOwned;
    this.numPrice = numPrice;
    this.numPriceMultiplier = numPriceMultiplier;
    this.numPower = numPower;
    this.numTotalPower = numTotalPower;

    this.elem = elem;
    this.elem.addEventListener("click", this.buy);
    this.elemOwned = elemOwned;
    this.elemPrice = elemPrice;
  }

  buy() {
    this.numOwned += 1;
    this.elemOwned.innerHTML = this.numOwned + " Owned";
    cottonAmount -= this.numPrice;
    this.numTotalPower += this.numPower;
    this.numPriceMultiplier = Math.ceil(this.numPrice / 10);
    this.numPrice = this.numPrice + this.numPriceMultiplier;
    this.elemPrice.innerHTML = "Price: " + this.numPrice + " Cotton";
  }
}

let toolUpgrade = new Upgrade({
  numOwned: 0,
  numPrice: 10,
  numPriceMultiplier: 0,
  numPower: 1,
  numTotalPower: 0,
  elem: document.querySelector("#tools"),
  elemOwned: document.querySelector("#toolsOwned"),
  elemPrice: document.querySelector("#toolsPrice"),
});

let clickerUpgrade = new Upgrade({
  numOwned: 0,
  numPrice: 100,
  numPriceMultiplier: 0,
  numPower: 10,
  numTotalPower: 0,
  elem: document.querySelector("#clickers"),
  elemOwned: document.querySelector("#clickersOwned"),
  elemPrice: document.querySelector("#clickerPrice"),
});

let farmUpgrade = new Upgrade({
  numOwned: 0,
  numPrice: 10000,
  numPriceMultiplier: 0,
  numPower: 100,
  numTotalPower: 0,
  elem: document.querySelector("#farms"),
  elemOwned: document.querySelector("#farmsOwned"),
  elemPrice: document.querySelector("#farmPrice"),
});
cps.innerHTML = cpsAmount + " CPS";
counter.innerHTML = cottonAmount + " Cotton";

//When you click on the cotton it adds whatever the clicking power is to the counter
imgCotton.addEventListener("click", function click() {
  cottonAmount += clickPower;
  counter.innerHTML = cottonAmount + " Cotton";
});

//Sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Adds CPS and waits a second
async function addCotton() {
  while (true) {
    cpsAmount =
      toolUpgrade.numTotalPower +
      clickerUpgrade.numTotalPower +
      farmUpgrade.numTotalPower;
    cps.innerHTML = cpsAmount + " CPS";
    counter.innerHTML = Math.floor(cottonAmount) + " Cotton";
    cottonAmount += cpsAmount / 100;
    await sleep(10);
  }
}

const allUpgrades = [toolUpgrade, clickerUpgrade, farmUpgrade];
let upgradeIndex;
async function enableStuff() {
  while (true) {
    for (let x = 0; x < allUpgrades.length; x++) {
      upgradeIndex = allUpgrades[x];
      if (cottonAmount < upgradeIndex.numPrice) {
        upgradeIndex.elem.style.opacity = "50%";
        upgradeIndex.elem.removeEventListener("click", upgradeIndex.buy);
      } else {
        upgradeIndex.elem.style.opacity = "100%";
        upgradeIndex.elem.addEventListener("click", upgradeIndex.buy);
      }
    }
    await sleep(10);
  }
}

addCotton();
enableStuff();

// Enables the Info box to follow the mouse. It is displayed using opacity.
const onMouseMove = (e) => {
  infoBox.style.left = e.pageX + "px";
  infoBox.style.top = e.pageY + "px";
};
document.addEventListener("mousemove", onMouseMove);

// Function to display contents of Info page
let upgradesOwned;
let upgradePower;
let upgradeTotalPower;
async function showInfoBox(upgradeName) {
  if (upgradeName == "Tool") {
    upgradesOwned = toolUpgrade.numOwned;
    upgradePower = toolUpgrade.numPower;
    upgradeTotalPower = toolUpgrade.numTotalPower;
  } else if (upgradeName == "Clicker") {
    upgradesOwned = clickerUpgrade.numOwned;
    upgradePower = clickerUpgrade.numPower;
    upgradeTotalPower = clickerUpgrade.numTotalPower;
  } else if (upgradeName == "Farm") {
    upgradesOwned = farmUpgrade.numOwned;
    upgradePower = farmUpgrade.numPower;
    upgradeTotalPower = farmUpgrade.numTotalPower;
  }

  infoTitle.innerHTML = upgradeName + " Info";
  infoOwned.innerHTML = upgradeName + " Owned: " + upgradesOwned;
  infoPower.innerHTML = upgradeName + " Power: " + upgradePower;
  infoTotalPower.innerHTML =
    "Total " + upgradeName + " Power: " + upgradeTotalPower;
  await sleep(0.1);
}

// Shows info box for all the upgrades
function infoTool() {
  return showInfoBox("Tool");
}
function infoClicker() {
  return showInfoBox("Clicker");
}
function infoFarm() {
  return showInfoBox("Farm");
}

tools.addEventListener("mouseover", infoTool);
clickers.addEventListener("mouseover", infoClicker);
farms.addEventListener("mouseover", infoFarm);
