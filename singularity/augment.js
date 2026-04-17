/** @param {NS} ns */
export async function main(ns) {
  // set faction
  let faction = "Slum Snakes"
  let debug = true
  // initial loop waits for augmentation to be available 
 // All augs
 let allAugs = ns.singularity.getAugmentationsFromFaction(faction)
 if(debug) {
 ns.print(allAugs) 
 }
 /*
 owned augs
 available augs



 
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
