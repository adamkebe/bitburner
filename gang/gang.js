/** @param {NS} ns */
export async function main(ns) {
// gets all members
  let members = ns.gang.getMemberNames()
  // recruits new members
let recruits = ns.gang.getRecruitsAvailable()
  if (recruits>0) {
for (let i = 0; i < recruits - 1; i++) {
       members
  let name = members[members.length-1]+1;
  ns.gang.recruitMember(name)
  
}
  }
  //ascends all members if they meet a certain condition 
for (let i = 0; i < members.length; i++) {
      if (true) {
        ns.gang.ascendMember(members[i])
      }
}
}
