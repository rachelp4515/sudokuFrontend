import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import Nav from "./nav"

export default function Login() {
    const [username, updateUN] = useState("")
    const [password, updatePW] = useState("")
    const [cookie, setCookie, removeCookie] = useCookies(['nToken'])
    const nav = useNavigate()

    function loginUser() {
        fetch("http://localhost:4000/login/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': "http://localhost:4000/"
            },
            credentials: "include",
            body: JSON.stringify({ username, password }),

        })


            .then(res => res.json())
            .then(json => {
                setCookie("nToken", json.token)
                nav("/")
                // <-- why

            })
    }



    return (
        <div className="login">

            <div>
                <h1>Log In</h1>
                <div className="loginForm">
                    <input type="text" placeholder="username" value={username} onChange={e => updateUN(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={e => updatePW(e.target.value)} />
                </div>
            </div>
            <button onClick={() => loginUser()}> Go </button>
            <Link to='/signup'>New User</Link>
        </div>
    )
}