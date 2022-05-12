import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom"
import { faUserGear, faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCookies } from "react-cookie";
import { useEffect, useState } from 'react';

const homeIcon = <FontAwesomeIcon icon={faHouse} />
const logoutIcon = <FontAwesomeIcon icon={faArrowRightFromBracket} />

export default function Account() {
  const [cookie, setCookie, removeCookie] = useCookies("nToken")
  const nav = useNavigate()
  const [user, setUser] = useState({})

  function logout(e) {
    removeCookie("nToken")
    nav("/login")
  }



  let parsedCookie = null
  let isExpired = true
  if (Object.keys(cookie).length != 0) {
    parsedCookie = jwt_decode(cookie.nToken);
    isExpired = new Date(parsedCookie.exp * 1000) < new Date()
    if (isExpired) {
      removeCookie("nToken")
    }

  }

  useEffect(() => {
    console.log(parsedCookie)
    if (parsedCookie != null) {
      fetch(`http://https://sudoku-backend-rp.herokuapp.com/user/${parsedCookie._id}`).then(res => res.json())
        .then(json => setUser(json.user))
    }

  }, [])

  return (
    <div className="account">
      <div className='fakeNav'>
        <h1> Sudoku </h1>
        <ul>
          <li onClick={logout}> <a href="">{logoutIcon} <br /> Logout </a> </li>
          <li> <Link to='/'> {homeIcon} <br /> Home </Link> </li>
        </ul>
      </div>

      <div className='userInfo'>
        <div>
          <h4 htmlFor="username">Username</h4>
          <h4 htmlFor="email">Email</h4>
          <h4 htmlFor="phone number">Phone Number</h4>
        </div>

        <div>
          <p> {user.username} </p>
          <p> {user.email} </p>
          <p> {user.phone} </p>
        </div>
      </div>
        {/* <button> Edit your information </button> */}

    </div>
  )
}