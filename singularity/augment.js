/** @param {NS} ns */
export async function main(ns) {
  // initialise
  //arrays
  let allAugs = []
  let availableAugs = []
  let ownedAugs = []
  //vars
  let canBuyAugs = false
  let faction = null
  let money = 0
  let prereq = []
  let prereqOwned = null
  let reputation = 0
  
  const aug = {
    name: null,
    cost: null,
    rep: null,
    faction: null,
    reset: function() {
      this.name = null
      this.cost = null
      this.rep = null
      this.faction = null
      ns.print("aug reset: ", aug)
    }
}
  const maxAug = {
    name: null,
    cost: null,
    rep: null,
    faction: null
  }

//options
  let debug = false
  let test = true

// FUNCTIONS
  function getAllFactionAugs(faction) {
    // All augs
    ns.print("checking all augs")
 allAugs = ns.singularity.getAugmentationsFromFaction(faction)
 // owned augs, including those purchased but not yet installed
  ownedAugs = ns.singularity.getOwnedAugmentations(true)
  if(debug) {
 ns.print("All ", faction, " augs: ", allAugs)
 ns.print("Owned augs: ", ownedAugs)
  }
  } //end function

  function getAvailableFactionAugs() {
    //available augs 
    ns.print("checking available augs")
 for(let i = 0; i < allAugs.length; i++) {
   if(allAugs[i] == "Neuroflux Governor") {
ns.print("current aug: ", allAugs[i])
   }
   prereq = ns.singularity.getAugmentationPrereq(allAugs[i])
  if(prereq.length == 0) {
    prereqOwned = true
  }
   else {
    ns.print(ownedAugs.indexOf(prereq))
     prereqOwned = ownedAugs.indexOf(prereq) >= 0
   }
   ns.print(allAugs[i], " prereq: ", prereq, " prereqs owned? ", prereqOwned)
   if(prereqOwned && ownedAugs.indexOf(allAugs[i]) < 0 || allAugs[i] == "Neuroflux Governor") {
availableAugs.push(allAugs[i])
    if(test) {
 ns.print(allAugs[i])
 //ns.print("Available augs: ", availableAugs)
    } 
   }
 }
  } //end function

function getMaxAug(faction) {
  ns.print("checking max aug")
  for(let i = 0; i < availableAugs.length; i++) {
  // update aug object
   aug.name = availableAugs[i]
   aug.cost = ns.singularity.getAugmentationPrice(availableAugs[i])
   aug.rep  = ns.singularity.getAugmentationRepReq(availableAugs[i])
   aug.faction = faction
   //prereq = ownedAugs.includes(ns.singularity.getAugmentationPrereq(aug.name))
   // check if aug is max aug
   money = ns.getServerMoneyAvailable("home")
   reputation = ns.singularity.getFactionRep(faction)
   if(aug.cost <= money && aug.rep <= reputation && aug.cost>maxAug.cost) { // && prereq) {
   maxAug.name = aug.name 
   maxAug.cost = aug.cost
   maxAug.rep = aug.rep
   maxAug.faction = aug.faction
   
  if(test) {
 ns.print("Aug object: ", aug)
 ns.print("MaxAug object: ", maxAug)
 }
   }
   }
     //clears available augs for next faction
     availableAugs = []
  } //end function

function buyMaxAug() {
  ns.print("Max aug undefined? ", maxAug.name==undefined)
  if(maxAug.name!=undefined) {
   let success = ns.singularity.purchaseAugmentation(maxAug.faction, maxAug.name)
    aug.reset()
    maxAug.name = null
    if(!success) {
      canBuyAugs = false;
    }
  }
  else {
  ns.print("no purchasable augs")
    canBuyAugs = false;
  }
  } //end function
  
  /* Function template
  function myFunction() {
  
  } //end function
*/
  
  // START EXECUTION
  // set faction
  faction = "Slum Snakes"
  // initialloop waits for augmentation to be available 
  while(!canBuyAugs) {
  getAllFactionAugs(faction);
  getAvailableFactionAugs();
  getMaxAug(faction);
  canBuyAugs = maxAug.name!=undefined
  await ns.asleep(1000)
  }
  //purchasing loop while augs are available
  while(canBuyAugs) {
  getAllFactionAugs(faction);
  getAvailableFactionAugs();
  getMaxAug(faction);
  
  //Buy the max aug after all factions have been scanned
  buyMaxAug()
  }

   
   
  if(debug) {
 ns.print("THE END ", "Available augs: ", availableAugs)
  }
 /*
 
 


 
  while("no augment") {
  // check for augmentation 
    ns.await(500)
  }
  while("augment available") {
    // buy most expensive augmentation 
}
*/
  //backup and install augmentations 
  //ns.singularity.exportGame()
  //ns.singularity.installAugmentations()


ns.exit()
} //last bracket of function

