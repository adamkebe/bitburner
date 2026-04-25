/** @param {NS} ns */
export async function main(ns) {
  //OPTIONS

  //VARIABLES
  let members = []
  let n = 0

  //FUNCTIONS
  function getMembers() {
  // gets all members
  members = ns.gang.getMemberNames()
  }
  
  /*
  //STATES
  join gang(karma. faction, create gang) 
  First members (get to 3 members) 
  expand gang(aac multi > 6, terrorism, 9-10 members)
  gain power (all train combat, asc mult > 9, territory warfare)
  grain territory (min win chamce 40%, stsrt clashes)
  production(min win chance 90%, set max members to terrorism, delay ascension)
aug(buy augs)
cash(switch to cash producton)
no war(when territory is 100% switch away from territory warfare) 
buy player augs(add this at some stage, ensure ascension is rapid)
  */
  
  while(true) {
  getMembers
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
  let ratios = ns.gang.getAscensionResult(members[i])
  if(ratios!=undefined) {
  let hack = ratios.hack
  let strength = ratios.str
  let defence = ratios.def
  let dexterity = ratios.dex
  let agility = ratios.agi
  let charisma = ratios.cha
  let ascensionRatios = [hack, strength, defence, dexterity, agility, charisma]
  ns.print(ascensionRatios)
  ns.print(Math.max(...ascensionRatios))
      if (Math.max(...ascensionRatios)>1.05) {
        ns.gang.ascendMember(members[i])
      }
  }
}
   await ns.gang.nextUpdate()
    //n += 1 ; ns.print("n ", n)
  } //end of while loop
}
