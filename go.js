/** @param {NS} ns */
export async function main(ns) {
  // TO DO:
  // target seeker finds all white stones in a column (currenty only finds the first, ie. indexOf only finds the first result)
  // target seeker pushes each target to targetList including: (target[x,y], freeMoves, [targetMoves])
  // target stays the same until fully blocked (fix "targetMoves = [] or target === null" - this doesn't get checked it seems)
  // when only one point is left next to an enemy chain at the game, attack it
  // do not remove either of the last two reserved points in our own chains

  //FUTURE:
  // convert each move type to a pseudofunction (produces a list of moves for selection)
  // put move types at the bottom
  // put in logic to select a move type, sets "moveType" variable
  // use if(moveType="x") {move[x,y]} - input from the move type list
  // put in actions (sequences of moves), eg. block, surround, protect, connect
  // put in sequences (sequences of actions, eg. protect then connect then block)
  // put in strategies (priorities for sequences or actions)
  // potentially put in styles (priorities for strategies)

  // Kills previous instances of go.js
  //ns.scriptKill("go.js", "home");
  // Options

  let logBlockMoves = false
  let logTargetMoves = true
  let logDebug = true
  let resetOnStart = true
  let loop = true
  let faction = "Slum Snakes"
  //Faction options:
  // "No AI"
  // "Netburners"
  // "Slum Snakes"
  //
  //
  //

  let boardsize = 7
  let addedWait = true

  // Starts new board
  if (resetOnStart) {
    ns.go.resetBoardState(faction, boardsize);
    ns.tprint("New game");
  }
  if (addedWait) { await ns.sleep(3000) };
  // Declare variables
  let result, x, y, started;
  x = 0
  y = 0
  let target = null
  ns.tprint(target)
  let targetMoves = []
  ns.tprint(targetMoves)
  let firstMove = null

  //Declare move types
  // first (middle, corner protect/surround)
  // random
  // block (for white)
  // connect
  // surround

  //Starts loop
  do {
    const board = ns.go.getBoardState();
    const validMoves = ns.go.analysis.getValidMoves();

    // Gets a random move (default action)
    const getRandomMove = (board, validMoves) => {
      const moveOptions = [];
      const size = board[0].length;

      // Look through all the points on the board
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          // Make sure the point is a valid move
          const isValidMove = validMoves[x][y] === true;
          // Leave some spaces to make it harder to capture our pieces.
          // We don't want to run out of empty node connections!
          const isNotReservedSpace = x % 2 === 1 || y % 2 === 1;

          if (isValidMove && isNotReservedSpace) {
            moveOptions.push([x, y]);
          }
        }
      }

      // Choose one of the found moves at random
      const randomIndex = Math.floor(Math.random() * moveOptions.length);
      return moveOptions[randomIndex] ?? [];
    };
    const [randX, randY] = getRandomMove(board, validMoves);
    // TODO: more move options
    //Start: get centre square
    //If no black stones are on the board, put a stone on the centre square
    //TODO: make the starting point the mid-point of the board length
    //for(let i = 0; i<board.length; i++) {
    //  if(board[i].includes("X")) {
    //  ns.print(board[i], " x = ", i, " y = ", board[i].indexOf("X"));
    // started = true
    // ns.tprint("started ", started);
    // }
    // }
    if (!started === true) {
      ns.tprint(board);
      ns.tprint("No black stones, placing stone at centre");
      targetMoves.push([3, 3])
      started = true
      firstMove = true

    }


    // Checks for a target
    if (logDebug) {
      ns.tprint("target check and splice ", target)
      ns.tprint("is target not equal to null? ", !target === null)
    }
    if (targetMoves.length > 0) {
      // check the target moves list and go to the next valid one, remove any invalid ones
      for (let k = 0; k < targetMoves.length; k++) {
        if (logDebug) {
          ns.tprint("checking for null in target move, ", targetMoves[k])
          ns.tprint("x ", targetMoves[k][0])
          ns.tprint("does x = null? ", targetMoves[k][0] === undefined)
          ns.tprint("y ", targetMoves[k][1])
          ns.tprint("does y = null? ", targetMoves[k][1] === undefined)
        }
        if (targetMoves[k][0] === undefined || targetMoves[k][1] === undefined) {
          if (logDebug) {
            ns.tprint("null, removed from targetMoves ", targetMoves[k])
          }
          targetMoves.splice(k, 1);
          k--
        }
      }
      for (let k = 0; k < targetMoves.length; k++) {
        if (logDebug) {
          ns.tprint("checking for invalid in target move, ", targetMoves[k])
        }
        if (!validMoves[targetMoves[k][0]][targetMoves[k][1]]) {
          if (logDebug) {
            ns.tprint("invalid, removed from targetMoves ", targetMoves[k])
          }
          targetMoves.splice(k, 1);
          k--
          if (k === targetMoves.length) {
            target = null
            ns.tprint("target blocked, target cleared")
          }
        }

      }
    }

    //If there is a white stone, block (surround) it
    for (let i = 0; i < board.length; i++) {
      // checks for O in column i
      if (board[i].includes("O") && targetMoves.length < 1) {
        // goes through column i to find instances of 0        
        for (let h = 0; h < board[i].length; h++) {
          if (board[i][h] == "O") {
            ns.tprint("white stone found at ", [i, h]);
            if (logDebug) {
              ns.tprint("board i h ", board[i][h])
              ns.tprint("h ", h)
            }
            //check valid moves around target
            let targetX = i
            let targetY = h
            //let targetY = board[i].indexOf("O")
            target = [targetX, targetY]
            if (logTargetMoves) { ns.tprint("block target ", target) }
            let pointUp = [targetX, targetY + 1]
            let pointDown = [targetX, targetY - 1]
            let pointLeft = [targetX - 1, targetY]
            let pointRight = [targetX + 1, targetY]
            let blockMoves = [pointUp, pointDown, pointLeft, pointRight]
            // Removes any undefined point from blockMoves (ie. x or y = -1)
            for (let j = 0; j < (blockMoves.length); j++) {
              if (logBlockMoves) {
                ns.tprint("move# ", j, "co-ordinates ", blockMoves[j]);
                ns.tprint("full blockMoves list ", blockMoves);
              }
              if (blockMoves[j].includes(-1) || blockMoves[j].includes(board[0].length)) {
                if (logBlockMoves) {
                  ns.tprint("Removing ", blockMoves[j], "from blockMoves")
                }
                blockMoves.splice(j, 1)
                j--
              }
              //if(blockMoves[j]==null) {
              //  ns.tprint("blockMoves null", blockMoves[j]);
              //  break
              //}

            }
            if (logBlockMoves) {
              ns.tprint("block moves", blockMoves);
            }
            let freeMoves = 0
            //targetMoves = []
            for (let j = 0; j < blockMoves.length; j++) {
              //validMoves[blockMoves[j][0]][blockMoves[j][1]] === true
              if (logBlockMoves) {
                ns.tprint("blockMoves #", j, " ", blockMoves[j], "x ", blockMoves[j][0], " y ", blockMoves[j][1])
                ns.tprint("valid? ", validMoves[blockMoves[j][0]][blockMoves[j][1]]);
              }
              if (validMoves[blockMoves[j][0]][blockMoves[j][1]] && targetMoves.indexOf(blockMoves[j]) < 0) {
                freeMoves += 1
                targetMoves.push(blockMoves[j])
                //ns.tprint("New target moves, full list", targetMoves);
              }
            }
            if (freeMoves === 0) {
              if (logTargetMoves) {
                ns.tprint("Blocked ", target);
              }
              target = null
            }
            else {
              if (logTargetMoves) {
                ns.tprint("Target moves ", targetMoves);
              }
              //break;
            }
            //validMoves[pointUp[0]][pointUp[1]] === true
            //if(!validMoves[pointUp[0]][pointUp[1]]) {
            //  ns.tprint(pointUp, " invalid");
            // ns.tprint(pointUp[0], ",", pointUp[1]);
            //  ns.tprint(validMoves[pointUp[0]][pointUp[1]]);
            //  ns.exit();
            //  }
            //else {
            //  ns.tprint(pointUp, "valid");
            //  ns.exit();
            //}
            //ns.print(" x = ", targetX, " y = ", targetY);

            //ns.tprint("started ", started);
          }
        }
      }
    }

    // if(!board.indexOf("O")<0 && target === null) {
    //Get co-ordinates of white stone
    //   for(let i = 0; i<board.length; i++) {
    //     if(board[i] === "O") {
    //       target = board[i]
    //       ns.tprint("target ", board[i]);

    //    }

    // }
    //}

    //Place black stones around each side of the white stone 
    //x = 4
    //y = 4
    //TODO: start with stones nearest the centre, then nearest your current network

    //Defines the block action

    // Choose a move from our options (currently just "random move")


    //ns.tprint("searching for target")
    //ns.tprint("started ", started)
    //ns.tprint("board ", board)

    // Loop: checks the next target move and sets it as the next move if valid, removes it if invalid
    // Adjust this to find and use the last target until it's blocked
    if (logTargetMoves) { ns.tprint("target ", target) }
    if (targetMoves != null) { ns.tprint("target moves", targetMoves) }
    if (started === true && target != null) {
      ns.tprint("finding target")
      for (let k = 0; k < targetMoves.length; k++) {
        if (validMoves[targetMoves[k][0]][targetMoves[k][1]]) {
          x = targetMoves[k][0]
          y = targetMoves[k][1]
          ns.tprint("valid move? ", validMoves[targetMoves[k][0]][targetMoves[k][1]])
          ns.tprint("placing stone on ", targetMoves[k]);
          if (targetMoves == null) { target = null }
          if (targetMoves == []) { target = null }
          if (targetMoves[k] == null) { target = null }
          break
        }
        else {
          ns.tprint("invalid move ", targetMoves[k])
          targetMoves.splice(k, 1)
          k--;
          if (targetMoves == null) { target = null }
          if (targetMoves == []) { target = null }
          if (targetMoves[k] == null) { target = null }
        }

      }

    }

    // if (true) {//logDebug) {
    //   for (let k = 0; k < targetMoves.length; k++) {
    //    ns.tprint("pre-highlight check ", targetMoves[k])
    //    if (targetMoves[k][0] != (undefined) || targetMoves[k][1] != (undefined)) {
    //       ns.tprint("highlighting ", targetMoves[k], " , separate x,y ", targetMoves[k][0], ",", targetMoves[k][1])
    //       ns.toast("highlighting "+targetMoves[k][0]+","+targetMoves[k][1]);
    //       ns.go.analysis.highlightPoint(targetMoves[k][0], targetMoves[k][1])
    //      await ns.sleep(1000)
    //    }
    //  }
    //  ns.tprint("all points highlighted")
    //  await ns.sleep(1000)
    //break
    //}
    if (started === true && firstMove === false && targetMoves.length < 1) {
      //x = randX;
      //y = randY;
      targetMoves.push([randX, randY])
      ns.tprint("no target ", target);
      ns.tprint("making random move ", [randX, randY]);
    }

    if (targetMoves.length < 1 || targetMoves[0][0] === undefined || targetMoves[0][1] === undefined) {//x === undefined) {
      // Pass turn if no moves are found
      result = await ns.go.passTurn();
      ns.tprint("passing");
    } else {
      // Play the selected move
      ns.tprint("playing ", targetMoves[0])
      ns.tprint("______________________")
      result = await ns.go.makeMove(targetMoves[0][0], targetMoves[0][1]);
      if (firstMove === true) {
        firstMove = false
      }
      if (addedWait) { await ns.sleep(500) }
    }

    // Log opponent's next move, once it happens
    await ns.go.opponentNextTurn();

    if (addedWait) { await ns.sleep(500) };

    if (result?.type == "gameOver" && loop === true) {
      ns.go.resetBoardState(faction, boardsize);
      ns.tprint("Game over, starting new game");
      if (addedWait) { await ns.sleep(3000) };
    }

    // Keep looping as long as the opponent is playing moves
  } while (true); //while (result?.type !== "gameOver");
}
