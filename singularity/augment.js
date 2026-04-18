/** @param {NS} ns */
export async function main(ns) {
  // set faction
  let faction = "Slum Snakes"
  let debug = true
  // initial loop waits for augmentation to be available 
 // All augs
 let allAugs = ns.singularity.getAugmentationsFromFaction(faction)
 // owned augs, including those purchased but not yet installed
  let ownedAugs = ns.singularity.getOwnedAugmentations(true)
  if(debug) {
 ns.print("All ", faction, " augs: ", allAugs)
 ns.print("Owned augs: ", ownedAugs)
 }

  //available augs
  let availableAugs = []
 for(let i = 0; i < allAugs.length; i++) {
   if(ownedAugs.inedexOf(allAugs[i]) >= 0) {
availableAugs.push(allAugs[i])
    if(debug) {
 ns.print(allAugs[i])
 ns.print("Available augs: ", availableAugs)
    } 
   }
 }
  if(debug) {
 ns.print("Available augs: ", availableAugs)
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
}
