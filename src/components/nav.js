import { Link } from "react-router-dom"

export default function Nav(){
    return(
        <div className="nav">
            <ul>
                <li> <Link to='/login'>Login</Link> </li>
                <li> <Link to='/'> New Puzzle </Link> </li>
                <li> <Link to='/account'> Account </Link> </li>
            </ul>
        </div>
    )
}