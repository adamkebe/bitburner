/** @param {NS} ns */
export async function main(ns) {
  let fileContent = ns.read("serverdetails.txt");
  let serverDetails = JSON.parse(fileContent);
  fileContent = ns.read("allservers.txt");
  let allServers = JSON.parse(fileContent);
  let higherServer = "none";
  let targetServer = null
  if (ns.args[0] != undefined && allServers.includes(ns.args[0])) {
   targetServer = ns.args[0]
  }
  else {
    ns.tprint("server not found")
    ns.exit()
  }
  let serverPath = targetServer
  let i = 0
  ns.tprint("looking for ", targetServer)
  while (higherServer != "home") {
    for (let i = 0; i < serverDetails.length; i++) {
      if (serverDetails[i].includes(targetServer)) {
        //ns.tprint("SERVER FOUND!")
        higherServer = serverDetails[i][2]
        serverPath.push(higherServer)
        targetServer = higherServer
        ns.tprint(targetServer)
        break
      }
    }
  }
  /*while (higherServer != "home") {
  }
  ns.tprint("all servers found")
  ns.tprint(serverPath)
*/
}
