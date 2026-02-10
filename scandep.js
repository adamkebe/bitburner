/** @param {NS} ns */
export async function main(ns) {
  let fileContent = ns.read("allservers.txt");
  let list = JSON.parse(fileContent);
  //ns.tprint(list); // Access data
  let debugLog = false
  let argarray = ns.args
  if(argarray.includes("debug")) {
    debugLog = true
  }

  let host = "home";
  ns.print(list)
  let numOldHacked = 0
  let numNewHacked = 0
  let numMinPorts = 0
  let numMinHack = 0
  let minPorts = null;
  let minHack = null;

 
  for (let i = 0; i < list.length; i++) {
    let t = list[i]; ns.print(t);
    let rooted = ns.hasRootAccess(t); //ns.tprint(rooted, " Does rooted = true? ", rooted===true);
    let ports = ns.getServerNumPortsRequired(t); //ns.tprint(ports);
    let maxports = 0;
    if (ns.fileExists("bruteSSH.exe", "home")) { maxports++ }
    if (ns.fileExists("relaySMTP.exe", "home")) { maxports++ }
    if (ns.fileExists("FTPCrack.exe", "home")) { maxports++ }
    if (ns.fileExists("HTTPWorm.exe", "home")) { maxports++ }
    if (ns.fileExists("SQLInject.exe", "home")) { maxports++ }
    let hacklevel = ns.getServerRequiredHackingLevel(t); //ns.tprint(hacklevel);
    let terminalPrint = false
    let interestingServers = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z", "Daedalus", "w0rldd4emon"]
    if (interestingServers.includes(t)) {
      terminalPrint = true
    }
    if (rooted === true) {
      ns.print(t, " -already rooted")
      if(terminalPrint) {
        ns.tprint(t, " -already rooted")
      }
      numOldHacked += 1;
      //if(!ns.isRunning("hack.js", "home", t) && ns.getPurchasedServers().indexOf(t) <= 0 && t != "hack") {ns.exec("d-all.js","home", 1, "home",t)}
    }
    else if (ports > maxports) {
      ns.print(t, " -too many ports (", ports, "), hack level ", hacklevel)
      if(terminalPrint) {
        ns.tprint(t, " -too many ports (", ports, "), hack level ", hacklevel)
      }
      numMinPorts += 1
      if (minPorts == undefined) {
        minPorts = ports
      }
      else if (ports < minPorts) {
        minPorts = ports
      }

    }
    else if (hacklevel > ns.getHackingLevel()) {
      ns.print(t, " -hacking level too low (", hacklevel, ")")
      if(terminalPrint) {
        ns.tprint(t, " -hacking level too low (", hacklevel, ")")
      }
      numMinHack += 1

      if (minHack == undefined) {
        minHack = hacklevel
      }
      else if (hacklevel < minHack) {
        minHack = hacklevel
      }
    }
    else {
      ns.print(t, " -deploying root");
      if(terminalPrint) {
        ns.tprint(t, " -deploying root")
        //ns.run("findserver.js", 1, t, "silent")
      }
      numNewHacked += 1

      //ns.scp("deploy.js",host,"home");
      ns.exec("deploy.js", host, 1, list[i]);
      await ns.sleep(50);
      ns.run("findserver.js", 1, t, "silent")
      let backdoorServers = ns.readPort(90)
      if(debugLog) {
        ns.tprint("backdoor list ",backdoorServers) 
      }
      for(let k = backdoorServers.length - 1; k >= 0; k--) {
        if(debugLog) {
          ns.tprint(backdoorServers[k])
        }
        await ns.singularity.connect(backdoorServers[k])
        if(debugLog) {
          ns.tprint("not backdoored, not home? ", (!ns.getServer(backdoorServers[k]).backdoorinstalled && backdoorServers[k] != "home"))
        }
        if(!ns.getServer(backdoorServers[k]).backdoorinstalled && backdoorServers[k] != "home" && ns.getServer(backdoorServers[k]).hasadminrights) {
        await ns.singularity.installBackdoor(backdoorServers[k])
        }
        

      }
      
    }
  }
  ns.tprint("already hacked servers ", numOldHacked)
  ns.tprint("new hacked servers ", numNewHacked)
  ns.tprint("too many ports ", numMinPorts, " min ports ", minPorts)
  ns.tprint("hacking level too high ", numMinHack, " min hacking level ", minHack)
  await ns.sleep(30000);
  ns.scriptKill("d-all.js", "home");
}
