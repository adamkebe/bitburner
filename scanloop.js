/** @param {NS} ns */
export async function main(ns) {

  //Gets a list of all servers on the network
  var allservers = ns.scan("home") // Starts scan from home
  let serverLevel = 0
  let higherServer = "home"
  let serverDetails = [] // server name, server level, higher server, lower neighbors
  //FUTURE - add for loop to get server level here - these ones are level 1
  // Scans the next server in allservers 
  for (let i = 0; i < allservers.length; i++) {
    ns.print(allservers[i], " neighbours:");
    // Scans the server
    let neighbor = ns.scan(allservers[i]);
    if (neighbor.includes("home")) {
      higherServer = "home"
      serverLevel = 1
    }
    else {
      higherServer = neighbor[0]
      serverLevel = serverDetails[serverDetails.indexOf(neighbor[0])[0]]
    }
        // Adds the neighbours to allservers
    if (neighbor.includes("home")) {
      neighbor.splice(neighbor.indexOf("home"), 1)
    }
    serverDetails.push([allservers[i],serverLevel,higherServer,neighbor])
    for (let j = 0; j < neighbor.length; j++) {
      //ns.tprint(neighbor[j], " ", allservers.indexOf(neighbor[j]));
      if (neighbor[j] === "home") { ns.print("-home not added") }
      else if (allservers.indexOf(neighbor[j]) < 0) {
        allservers.push(neighbor[j]);
        ns.print(neighbor[j], " added to server list")
      }
      else {
        ns.print(neighbor[j], "duplicate not added")
      }

    }
  }
  await ns.write("allservers.txt", JSON.stringify(allservers), "w");
  await ns.write("serverdetails.txt", JSON.stringify(serverDetails), "w");;
  ns.print("full server list ", allservers)
  ns.print("server details ", serverDetails)
  ns.tprint("server scan complete")
}
