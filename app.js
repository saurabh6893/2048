import Grid from './Grid.js'
import Tile from './Tile.js'

const gameBoard = document.getElementById('game-board')
const grid = new Grid(gameBoard)

// console.log(grid.randomEmptyCell())
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()

console.log(grid.cellsByColumn)

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true })
}

function handleInput(e) {
  console.log(e.key)
  switch (e.key) {
    case 'ArrowUp':
      moveUp()
      break
    case 'ArrowDown':
      moveDown()
      break
    case 'ArrowRight':
      moveRight()
      break
    case 'ArrowLeft':
      moveLeft()
      break
    default:
      setupInput()
      return
  }
  setupInput()
}

function moveUp() {
  slideTiles(grid.cellsByColumn)
}

function slideTiles(cells) {
  cells.forEach((group) => {
    for (let i = 1; i < group.length; i++) {
      const cell = group[i]
      if (cell.tile == null) continue
      let lastValidCell
      for (j = i - 1; j >= 0; j--) {
        const moveToCell = group[j]
        if (!moveToCell.canAccept(cell.tile)) break
        lastValidCell = moveToCell
      }

      if (lastValidCell != null) {
        if (lastValidCell.tile != null) {
          lastValidCell.mergeTile = cell.tile
        } else {
          lastValidCell.tile = cell.tile
        }
        cell.tile = null
      }
    }
  })
}
