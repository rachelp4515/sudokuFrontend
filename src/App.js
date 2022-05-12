import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import './App.css';
import Nav from './components/nav';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { Navigate } from "react-router-dom"
import formatter from './utils';






function App() {
  const initial = formatter(makepuzzle())

  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial))
  const [initialSudoku, setInitialSudoku] = useState(getDeepCopy(initial))
  const [cookie, setCookie, removeCookie] = useCookies("nToken")
  // console.log(cookie)
  let user = null
  let isExpired = true
  if (Object.keys(cookie).length != 0) {
    user = jwt_decode(cookie.nToken);
    isExpired = new Date(user.exp * 1000) < new Date()
    if (isExpired) {
      removeCookie("nToken")
    }
  }

  function newSudoku() {
    const newPuzzle = formatter(makepuzzle())
    setInitialSudoku(getDeepCopy(newPuzzle))
    setSudokuArr(getDeepCopy(newPuzzle))
    console.log(makepuzzle())
  }






  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr))
  }

  function onInputChange(e, row, col) {
    let val = parseInt(e.target.value) || -1, grid = getDeepCopy(sudokuArr);

    if ((val === -1 )|| (val >= 1 && val <= 9)) {
      grid[row][col] = val;
    }
    setSudokuArr(grid)
  }




  function compareSudokus(current, solved){
    let res = {
      isComplete: true,
      isSolvable: true
    }
    for (var i=0; i<9; i++){
      for (var j=0; j<9; j++){
        if (current[i][j] !== solved[i][j]){
          res.isSolvable = false
        }
        res.isComplete = false
      }
    }
    return res
  }


  function checkpzl() {
    let sudoku = getDeepCopy(initialSudoku)
    solver(sudoku)
    let compare = compareSudokus(sudokuArr, sudoku)
    if(compare.isComplete){
      alert('Sudoku solved!')
    }else if (compare.isSolvable){
      alert('Keep going!')
    }else{
      alert("Sudoku couldn't be solved.")
    }
  }

  function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1
  }
  function checkCol(grid, col, num) {
    return grid.map(row => row[col]).indexOf(num) === -1;
  }
  function checkBox(grid, row, col, num) {
    //get box start index
    let boxArr = [],
      rowStart = row - (row % 3),
      colStart = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // get all the cell nums and push to boxArr
        boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }
    return boxArr.indexOf(num) === -1
  }

  function checkValid(grid, row, col, num ) {
    // checks if nums in row, col, and box are unique
    if (checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num)) {
      return true
    }
    return false
  }

  function getNext(row, col) {
    // if col hits 8, next row
    // if row AND col hit 8, next will be [0,0]
    // if col doesnt hit 8, next col
    return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0]
  }

  function solver(grid, row = 0, col = 0) {

    // if current cell full, move to next
    if (grid[row][col] !== -1) {
      // dont solve last cell
      let isLast = row >= 8 && col >= 8
      if (!isLast) {
        let [newRow, newCol] = getNext(row, col);
        return solver(grid, newRow, newCol)
      }

    }

    for (let num = 1; num <= 9; num++) {
      // check if num is valid in sudoku
      if (checkValid(grid, row, col, num)) {
        // fill num in cell
        grid[row][col] = num
        // get the next cell and repeat func
        let [newRow, newCol] = getNext(row, col)
        if (!newRow && !newCol) {
          return true
        }
        if (solver(grid, newRow, newCol)) {
          return true
        }
      }
    }
    grid[row][col] = -1;
    return false
  }

  function solvepzl() {
    let sudoku = getDeepCopy(initialSudoku)
    solver(sudoku)
    setSudokuArr(sudoku)
  }


  function resetpzl() {
    let sudoku = getDeepCopy(initialSudoku);
    // console.log(formatter(makepuzzle()), initial)
    setSudokuArr(sudoku)
  }


  return (
    <div className="App">
      <Nav />
      <div className='App-header'>
        {
          isExpired ?
            <Navigate to="/login" />
            :
            <h2>Username: {user.username}</h2>
        }
        <table>
          <tbody>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8,].map((row, rIndex) => {
                return <tr key={rIndex} className={(row+1) %3 === 0 ? 'bBorder' : ''}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8,].map((col, cIndex) => {
                    return <td key={rIndex + cIndex} className={(col+1) %3 === 0 ? 'rBorder' : ''}>

                      <input className='cellInput'
                        value={sudokuArr[row][col] === -1 ? '' : sudokuArr[row][col]  }// + 1
                        onChange={(e) => onInputChange(e, row, col)}
                        disabled={initialSudoku[row][col] !== -1}
                      />

                    </td>
                  })}
                </tr>
              })
            }
          </tbody>
        </table>
        <div className='buttonContainer'>
          <button className='checkbtn' onClick={checkpzl}> Check </button>
          <button className='solvebtn' onClick={solvepzl}> Solve </button>
          <button className='resetbtn' onClick={resetpzl}> Reset </button>
          <button className='newbtn' onClick={newSudoku}> New Puzzle </button>
        </div>
      </div>
      <script src="https://kit.fontawesome.com/d70a4d3a14.js" crossOrigin="anonymous"></script>
    </div>
  );
}

export default App;
