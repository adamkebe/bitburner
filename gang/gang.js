/** @param {NS} ns */
export async function main(ns) {
  let n = 0
  while(n<1) {
  // gets all members
  let members = ns.gang.getMemberNames()
    
  // recruits new members
let recruits = ns.gang.getRecruitsAvailable()
  if (recruits>0) {
for (let i = 0; i < recruits; i++) {
       members = ns.gang.getMemberNames()
  if(members.length>0) {
    let name = members[members.length-1]+1;
  ns.gang.recruitMember(name)
    ns.gang.setMemberTask(name, "Train Combat")
  }
  else {
    let name = "1"
ns.gang.recruitMember(name)
ns.gang.setMemberTask(name, "Train Combat")
  }
}
  }
  //ascends all members if they meet a certain condition 
for (let i = 0; i < members.length; i++) {
  ns.print(members[i])
  ns.print(ns.gang.getAscensionResult(members[i]))
  let hack = ns.gang.getAscensionResult(members[i]).hack
  let strength = ns.gang.getAscensionResult(members[i]).str
  let defence = ns.gang.getAscensionResult(members[i]).def
  let dexterity = ns.gang.getAscensionResult(members[i]).dex
  let agility = ns.gang.getAscensionResult(members[i]).agi
  let charisma = ns.gang.getAscensionResult(members[i]).cha
  let ascensionRatios = [hack, strength, defence, dexterity, agility, charisma]
  ns.print(Math.max(ascensionRatios)
      if (Math.max(ascensionRatios)>1.05) {
        ns.gang.ascendMember(members[i])
      }
}
    ns.gang.nextUpdate()
    n += 1 ; ns.print("n ", n)
  } //end of while loop
}
