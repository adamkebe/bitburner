/** @param {NS} ns */
export async function main(ns) {

  while(true) {
  // gets all members
  let members = ns.gang.getMemberNames()
  // recruits new members
let recruits = ns.gang.getRecruitsAvailable()
  if (recruits>0) {
for (let i = 0; i < recruits - 1; i++) {
       members
  if(members.length>0) {
    let name = members[members.length-1]+1;
  ns.gang.recruitMember(name)
  }
  else {
    let name = "1"
ns.gang.recruitMember(name)
  }
ns.gang.setMemberTask(name, "Train Combat")
  
}
  }
  //ascends all members if they meet a certain condition 
for (let i = 0; i < members.length; i++) {
      if (math.max(ns.gang.getAscensionResult(members[i]))>1.05) {
        ns.gang.ascendMember(members[i])
      }
}
    ns.gang.nextUpdate()
  } //end of while loop
}
