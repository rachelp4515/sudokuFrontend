import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Adder from './components/adder';
import Nav from './components/nav';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import {Navigate} from "react-router-dom"
const initial = [
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1]
]



function App() {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial))
  const [cookie, setCookie, removeCookie] = useCookies("nToken")
  console.log(cookie)
  let user = null
  let isExpired = true
  if(Object.keys(cookie).length != 0) {
    user = jwt_decode(cookie.nToken);
    isExpired = new Date(user.exp * 1000) < new Date()
    if(isExpired) {
      removeCookie("nToken")
    }
  }
  
  

  


  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr))
  }

  function onInputChange(e, row, col) {
    let val = parseInt(e.target.value) || -1, grid = getDeepCopy(sudokuArr);

    if (val === -1 || val >= 1 && val <= 9) {
      grid[row][col] = val;
    }
    setSudokuArr(grid)
  }

  function checkpzl() {


  }
  function resetpzl() {

  }
  function solvepzl() {

  }


  return (
    <div className="App">
      <Nav/>
      <div className='App-header'>
        <h3>Sudoku</h3>
        {
          isExpired?
          <Navigate to="/login"/>
          :
          <h2>Username: {user.username}</h2>
        }
        <table>
          <tbody>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8,].map((row, rIndex) => {
                return <tr key={rIndex} >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8,].map((col, cIndex) => {
                    return <td key={rIndex + cIndex}>

                      <input className='cellInput'
                        value={sudokuArr[row][col] === -1 ? '' : sudokuArr[row][col]}
                        onChange={(e) => onInputChange(e, row, col)}
                        disabled={initial[row][col] !== -1}
                      />

                    </td>
                  })}
                </tr>
              })
            }
          </tbody>
        </table>
        <div className='buttonContainer'>
          <button className='checkbtn' onClick='checkpzl'> Check </button>
          <button className='solvebtn' onClick='solvepzl'> Solve </button>
          <button className='resetbtn' onClick='resetpzl'> Reset </button>
        </div>
      </div>
    </div>
  );
}

export default App;
