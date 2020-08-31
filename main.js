// dimensions of the area (N)
// the initial position of the zombie
// a list of positions of poor creatures
// and a list of moves zombies will make
const fs = require('fs');
const path = require('path');
const inputFile = 'demo.txt'
let filePath = path.join(__dirname, inputFile);
let score = 0
let zombieFinal = {
  finalPos: [],
  score: score
}

const MOVE = {
  LEFT: 'L',
  RIGHT: 'R',
  UP: 'U',
  DOWN: 'D'
}

const readInput = () => {
  return fs.readFileSync(filePath, 'utf8').toString().split('\n')
}

const params = readInput();
const dimension = parseInt(params[0]);
let zombieInitialPos = params[1].replace('(', '').replace(')', '').split(',');
const movements = params[3];

const getCreaturePosList = () => {
  let creaturePos = [];
  params[2]
    .replace(/\)+/g, '')
    .split('(')
    .map(pos => {
      if (pos) {
        let cordString = pos.split(',')
        let cord = [parseInt(cordString[0]), parseInt(cordString[1])]
        creaturePos.push(cord)
      }
    });
  return creaturePos;
}

const creaturePosList = getCreaturePosList()

const getZombieFinalStatus = () => {
  let zombiePosY = parseInt(zombieInitialPos[1]);
  let zombiePosX = parseInt(zombieInitialPos[0]);
  let zombieCurrentPos = []

  for (let i = 0; i < movements.length; i++) {
    switch (movements[i]) {
      case MOVE.DOWN:
        zombiePosY = zombiePosY - 1;
        if (zombiePosY < 0) {
          zombiePosY = dimension - 1;
        }
        zombieCurrentPos = [zombiePosX, zombiePosY]
        if (checkIfInfected(zombieCurrentPos)) {
          zombieRedo(i, zombieCurrentPos)
        }
        break;
      case MOVE.UP:
        zombiePosY = zombiePosY + 1;
        if (zombiePosY === dimension) {
          zombiePosY = 0;
        }
        zombieCurrentPos = [zombiePosX, zombiePosY]
        if (checkIfInfected(zombieCurrentPos)) {
          zombieRedo(i, zombieCurrentPos)
        }
        break;
      case MOVE.LEFT:
        zombiePosX = zombiePosX - 1;
        if (zombiePosX < 0) {
          zombiePosX = dimension - 1;
        }
        zombieCurrentPos = [zombiePosX, zombiePosY]
        if (checkIfInfected(zombieCurrentPos)) {
          zombieRedo(i, zombieCurrentPos)
        }
        break;
      case MOVE.RIGHT:
        zombiePosX = zombiePosX + 1;
        if (zombiePosX === dimension) {
          zombiePosX = 0;
        }
        zombieCurrentPos = [zombiePosX, zombiePosY]
        if (checkIfInfected(zombieCurrentPos)) {
          zombieRedo(i, zombieCurrentPos)
        }
        break;
    }

    if (i === movements.length - 1) {
      zombieFinal.finalPos.unshift(zombieCurrentPos)
    }
  }
  zombieFinal.score = score
  return zombieFinal
}

const zombieRedo = (index, zombieCurrentPos) => {
  score++
  creaturePosList.splice(index, 1)
  zombieInitialPos = zombieCurrentPos
  getZombieFinalStatus()
}

const checkIfInfected = (currentZombiePos) => {
  let isInfected = false;
  if (creaturePosList.length) {
    for (let i = 0; i < creaturePosList.length; i++) {
      if (currentZombiePos[0] === creaturePosList[i][0] && currentZombiePos[1] === creaturePosList[i][1]) {
        isInfected = true;
      }
    }
  }
  return isInfected;
}

const printResult = () => {
  console.log('Example output')
  getZombieFinalStatus()
  console.log('Zombies score: ', zombieFinal.score)
  console.log('Zombie positions: ', zombieFinal.finalPos)
}

printResult()






