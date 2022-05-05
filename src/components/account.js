import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import {Navigate} from "react-router-dom"
import Nav from './nav';


export default function Account(){
    const[cookie, setCookie, removeCookie] = useCookies("nToken")
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

    return(
        <div className="account">
            <Nav />
            <div>
            <h2>Account</h2>
            <p> {user.username} </p>
            </div>

        </div>
    )
}