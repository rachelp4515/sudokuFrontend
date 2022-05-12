import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import Nav from "./nav"

export default function Login() {

    const [username, updateUN] = useState("")
    const [password, updatePW] = useState("")
    const [email, updateEM] = useState("")
    const [phone, updateNum] = useState("")
    const [cookie, setCookie, removeCookie] = useCookies(['nToken'])
    const nav = useNavigate()


    function createUser() {
        fetch("http://https://sudoku-backend-rp.herokuapp.com/sign-up/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': "http://https://sudoku-backend-rp.herokuapp.com/"
            },
            credentials: "include",
            body: JSON.stringify({ username, password, email, phone }),

        })


            .then(res => res.json())
            .then(json => {
                setCookie("nToken", json.token)
                nav("/")

            })
    }



    return (
        <div> <Nav />
            <div className="signup">
                <h1>Sign up</h1>
                <div className="signInForm">
                    <label htmlFor="username"> username </label>
                    <input type="text" placeholder="username" value={username} onChange={e => updateUN(e.target.value)} />

                    <label htmlFor="phone number"> phone number </label>
                    <input type="number" placeholder="1234567890" value={phone} onChange={e => updateNum(e.target.value)} />

                    <label htmlFor="email"> email </label>
                    <input type="email" placeholder="someone@email.com" value={email} onChange={e => updateEM(e.target.value)} />

                    <label htmlFor="password"> password </label>
                    <input type="password" placeholder="password" value={password} onChange={e => updatePW(e.target.value)} />
                </div>
                <button onClick={() => createUser()}> Go </button>
                <div>
                    <small> <em> Already have an account?  <Link to='/login'>Log in</Link> </em></small>
                </div>
            </div>
        </div>
    )
}
