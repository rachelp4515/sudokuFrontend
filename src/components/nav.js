import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear, faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from "react-cookie";

const accountIcon = <FontAwesomeIcon icon={faUserGear} />
const homeIcon = <FontAwesomeIcon icon={faHouse} />
const logoutIcon = <FontAwesomeIcon icon={faArrowRightFromBracket} />

export default function Nav(){
  const [cookie, setCookie, removeCookie] = useCookies("nToken")
  const nav = useNavigate()

  function logout(e) {
      removeCookie("nToken")
      nav("/login")
  }

    return(
        
        <div className="nav">
            <h1>Sudoku</h1>
            <div className="lists">
            <ul>
                <li className="icons" onClick={logout}> <a href="">{logoutIcon} <br/> Logout </a> </li>
                <li className="icons"> <Link to='/'> {homeIcon} <br/> Home </Link> </li>
                <li className="icons"> <Link to='/account'> {accountIcon} <br/> Account </Link> </li>
            </ul>

           
            </div>
        </div>
    )
}