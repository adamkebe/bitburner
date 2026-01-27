/** @param {NS} ns */
export async function main(ns) {
  let fileContent = ns.read("serverdetails.txt");
  let serverDetails = JSON.parse(fileContent);
  let higherServer = "none";
  let targetServer = "CSEC"
  if (ns.args[0] != undefined) {
    targetServer = ns.args[0]
  }
  let serverPath = [targetServer]
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
      if(i == serverDetails.length - 1 && serverDetails[i] != ns.args[0]) {
      ns.tprint("server not found")
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
