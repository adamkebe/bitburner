/** @param {NS} ns */
export async function main(ns) {
// Start - for Singularity bitnode

// buy Tor
  while(true) {
ns.singularity.purchaseTor()
    let programs = ns.singularity.getDarkwebPrograms()
    for( let i = 0; i<(programs.length -1) ; i++) {
ns.singularity.purchaseProgram(programs[i])
      await ns.sleep(10000)
    }
  }

// get hack level up to 50
  ns.singularity.universityCourse("Rothman University","Data Structures")
  while(ns.getHackingLevel() < 50) {
    await ns.sleep(10000)
    ns.getHackingLevel()
  }
    
// create bruteSSH and FTPcrack

// get strength, defense, dexterity and agility up to 30
  
//  PowerhouseGym
  /*
ns.getPlayer.strength()
ns.getPlayer.defense()
ns.getPlayer.dexterity()
ns.getPlayer.agility()

agility	"agi"	
defense	"def"	
dexterity	"dex"	
strength	"str"
  */

  
 /* while(ns.getHackingLevel() < 50) {
    await ns.sleep(10000)
    ns.getHackingLevel()
  */
let n = 0
  while(n < 1) {
    let gymWaitTime = 60000
ns.singularity.gymWorkout("Powerhouse Gym", "str")
await ns.asleep(gymWaitTime)
  ns.singularity.gymWorkout("Powerhouse Gym", "def")
await ns.asleep(gymWaitTime)
  ns.singularity.gymWorkout("Powerhouse Gym", "dex")
await ns.asleep(gymWaitTime)
  ns.singularity.gymWorkout("Powerhouse Gym", "agi")
await ns.asleep(gymWaitTime)
  n++
    ns.print(n)
  }
  
  // commit crime up to $1m
  
//  ns.singularity.commitCrime("Homicide")
ns.singularity.commitCrime("Homicide")
// gym loop to get homicide up to min 80%
  
// Future Loop
/*
ns.run("gym.js")
ns.run("crime.js")
ns.run("program.js")
ns.run("university.js")
*/

}
