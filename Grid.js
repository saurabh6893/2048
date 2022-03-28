const gridSize = 4
const cellSize = 20
const cellGap = 2

// --grid-size: 4;
//   --cell-size: 20vmin;
//   --cell-gap: 2vmin;
export default class Grid {
  constructor(gridElement) {
    gridElement.style.setProperty('--grid-size', gridSize)
    gridElement.style.setProperty('--cell-size', `${cellSize}vmin`)
    gridElement.style.setProperty('--cell-gap', `${cellGap}vmin`)
    createCellElement(gridElement)
  }
}
