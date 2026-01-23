/** @param {NS} ns */
export async function main(ns) {
  // TO DO: replace with an automatically generated text file and a for loop
await ns.wget("https://raw.githubusercontent.com/adamkebe/bitburner/refs/heads/main/update.js","update.js")
  await ns.wget("https://raw.githubusercontent.com/adamkebe/bitburner/refs/heads/main/go.js","go.js")
  await ns.wget("https://raw.githubusercontent.com/adamkebe/bitburner/refs/heads/main/scandep.js","scandep.js")
  await ns.wget("https://raw.githubusercontent.com/adamkebe/bitburner/refs/heads/main/scanloop.js","scanloop.js")
  await ns.wget("https://raw.githubusercontent.com/adamkebe/bitburner/refs/heads/main/findserver.js","findserver.js")
  /*await ns.wget("","deploy.js")
  await ns.wget()
  await ns.wget()
  */
}
