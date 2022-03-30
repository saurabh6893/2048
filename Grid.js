const gridSize = 4
const cellSize = 20
const cellGap = 2

// --grid-size: 4;
//   --cell-size: 20vmin;
//   --cell-gap: 2vmin;
export default class Grid {
  #cells

  constructor(gridElement) {
    gridElement.style.setProperty('--grid-size', gridSize)
    gridElement.style.setProperty('--cell-size', `${cellSize}vmin`)
    gridElement.style.setProperty('--cell-gap', `${cellGap}vmin`)
    this.#cells = createCellElement(gridElement).map((cellElement, index) => {
      return new Cell(
        cellElement,
        index % gridSize,
        Math.floor(index / gridSize)
      )
    })
  }

  get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || []
      cellGrid[cell.x][cell.y] = cell
      return cellGrid
    }, [])
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null)
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
    return this.#emptyCells[randomIndex]
  }
}

class Cell {
  #cellElement
  #x
  #y
  #tile
  #mergeTile
  constructor(cellElement, x, y) {
    this.#cellElement = cellElement
    this.#x = x
    this.#y = y
  }

  get x() {
    return this.#x
  }
  get y() {
    return this.#y
  }

  get tile() {
    return this.#tile
  }
  set tile(value) {
    this.#tile = value
    if (value == null) return
    this.#tile.x = this.#x
    this.#tile.y = this.#y
  }

  get mergeTile() {
    return this.#mergeTile
  }

  set mergeTile(value) {
    this.#mergeTile = value
    if (value == null) return
    this.#mergeTile.x = this.#x
    this.#mergeTile.y = this.#y
  }

  canAccept(tile) {
    return (
      this.tile == null ||
      (this.mergeTile == null && this.tile.value === tile.value)
    )
  }
}

function createCellElement(gridElement) {
  const cells = []
  for (let i = 0; i < gridSize ** 2; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cells.push(cell)
    gridElement.appendChild(cell)
  }
  return cells
}
