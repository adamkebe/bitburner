/** @param {NS} ns */
export async function main(ns) {
  //OPTIONS 

  //VARIABLES
  let member = null
  let members = []
  let n = 0

  //FUNCTIONS
  function getMembers() {
  // gets all members
  members = ns.gang.getMemberNames()
    return members
  } // END FUNCTION
  function recruitMembers() {
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
  }// END FUNCTION
  function ascendMembers(threshold = 1.05) {
  //ascends all members if they meet a certain condition 
    members = getMembers()
for (let i = 0; i < members.length; i++) {
  //ns.print(members[i])
  let ratios = ns.gang.getAscensionResult(members[i])
  if(ratios!=undefined) {
  let hack = ratios.hack
  let strength = ratios.str
  let defence = ratios.def
  let dexterity = ratios.dex
  let agility = ratios.agi
  let charisma = ratios.cha
  let ascensionRatios = [hack, strength, defence, dexterity, agility, charisma]
  //ns.print(ascensionRatios)
  //ns.print(Math.max(...ascensionRatios))
      if (Math.max(...ascensionRatios)>threshold) {
        ns.gang.ascendMember(members[i])
      }
  }
}
  } // END FUNCTION

  function buyUpgrades() {
  // buys all augs then equipment below a certain % of total money
  members = getMembers()
    let money = ns.getServerMoneyAvailable("home")
    // gets all upgrade names
    for (let i = 0; i < members.length; i++) {
      let member = members[i]
      let upgrades = ns.gang.getEquipmentNames(member)
      let augs = []
      let eq = []
    for (let i = 0; i < upgrades.length; i++) {
      //let money = ns.getServerMoneyAvailable("home")
      let upgrade = upgrades[i]
      let costRatio = ns.gang.getEquipmentCost(upgrade)/money
      let type = ns.gang.getEquipmentType(upgrade)
      ns.print("upgrade", upgrade, ", type ", type, ", ratio ", costRatio)
      if(type=="Augmentation" && costRatio <= 0.1) {
        //augs.push(upgrade)
        ns.print("aug < 0.1? ", type=="Augmentation" && costRatio <= 0.1)
        ns.gang.purchaseEquipment(member, upgrade)
      }
      else if(costRatio <= 0.01) {
        //eq.push(upgrade)
        ns.gang.purchaseEquipment(member, upgrade)
      }
      
    }  
    /*  forloop - buy aug if < 1/10 of server money
      buy eq if < 1/100 server money 
      */
    }
  
  } // END FUNCTION
  function setTask(threshold = 6, task = "Terrorism") {
  //sets task for members if they meet a certain condition 
    members = getMembers()
for (let i = 0; i < members.length; i++) {
  //ns.print(members[i])
  member = members[i]
  // change "ratios" to "multis" or "values" so it makes sense
  let ratios = ns.gang.gangMemberInfo(members[i])
  if(ratios!=undefined) {
  let hack = ratios.hack_asc_mult
  let strength = ratios.str_asc_mult
  let defence = ratios.def_asc_mult
  let dexterity = ratios.dex_asc_mult
  let agility = ratios.agi_asc_mult
  let charisma = ratios.cha_asc_mult
  let ascensionRatios = [hack, strength, defence, dexterity, agility, charisma]
  //ns.print(ascensionRatios)
  //ns.print(Math.max(...ascensionRatios))
      if (Math.max(...ascensionRatios)>threshold) {
        ns.gang.setMemberTask(member, task)
      }
  }
}
  } // END FUNCTION
/* function forLoop(array, fun) {
  // 
  for (let i = 0; i < array.length; i++) {
    a = array[i]
    fun(a)
    return fun(a)
  } // END FUNCTION */
  
/* FUNCTION TEMPLATE
  function getMembers() {
  // 
  
    return 
  } // END FUNCTION
*/
  /* useful game functions
  

  */
  
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

//EXECUTE CODE
  while(members == []) {
    members = getMembers()
    } //end of while loop
  while(members.length < 3) { //get first members
  members = getMembers()
  recruitMembers()
  ascendMembers()
  buyUpgrades()
  await ns.gang.nextUpdate()
  } //end of while loop
  while(members.length < 9) { //expand to 9 members
  members = getMembers()
  recruitMembers()
  ascendMembers(1.25)
  buyUpgrades()
  setTask()
  await ns.gang.nextUpdate()
  } //end of while loop
  
  while(true) { //endgame (for now)
  getMembers()
  recruitMembers()
  ascendMembers()
  buyUpgrades()
  await ns.gang.nextUpdate()
  } //end of while loop
  
}
