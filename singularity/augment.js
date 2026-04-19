/** @param {NS} ns */
export async function main(ns) {
  // initialise
  //arrays
  let allAugs = []
  let availableAugs = []
  let ownedAugs = []
  //vars
  let faction = null
  let money = 0
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
 for(let i = 0; i < allAugs.length; i++) {
   if(ownedAugs.indexOf(allAugs[i]) < 0) {
availableAugs.push(allAugs[i])
    if(debug || test) {
 ns.print(allAugs[i])
 ns.print("Available augs: ", availableAugs)
    } 
   }
 }
  } //end function

function getMaxAug(faction) {
   for(let i = 0; i < availableAugs.length; i++) {
  // update aug object
   aug.name = availableAugs[i]
   aug.cost = ns.singularity.getAugmentationPrice(availableAugs[i])
   aug.rep  = ns.singularity.getAugmentationRepReq(availableAugs[i])
   aug.faction = faction
   // check if aug is max aug
   money = ns.getServerMoneyAvailable("home")
   reputation = ns.singularity.getFactionRep(faction)
   if(aug.cost <= money && aug.rep <= reputation && aug.cost>maxAug.cost) {
   maxAug.name = aug.name 
   maxAug.cost = aug.cost
   maxAug.rep = aug.rep
   maxAug.faction = aug.faction
   
  if(debug || test) {
 ns.print("Aug object: ", aug)
 ns.print("MaxAug object: ", maxAug)
 }
   }
   }
     //clears available augs for next faction
     availableAugs = []
  } //end function

function buyMaxAug() {
  ns.singularity.purchaseAugmentation(maxAug.faction, maxAug.name)
  } //end function
  
  /* Function template
  function myFunction() {
  
  } //end function
*/
  
  // START EXECUTION
  // set faction
  faction = "Sector-12"
  // initialloop waits for augmentation to be available 
  getAllFactionAugs(faction)
  getAvailableFactionAugs()
  getMaxAug(faction)
  aug.reset()

  
  //Buy the max aug after all factions have been scanned
  buyMaxAug()

   
   
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
  //install augmentations 
  ns.singularity.exportGame()
  
//ns.run("install.js",1,"augment")
*/
ns.exit()
} //last bracket of function

