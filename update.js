/** @param {NS} ns */
/* download this script in the terminal using:
wget("https://raw.githubusercontent.com/adamkebe/bitburner/refs/heads/main/update.js","update.js")
then start the script to download all of the others
*/
export async function main(ns) {
await ns.wget("https://raw.githubusercontent.com/adamkebe/bitburner/refs/heads/main/update-exec.js","update-exec.js")
ns.run("update-exec.js")
}
