import { useEffect, useState } from "react"

export default function Adder() {
    
    const[a, updateA] = useState(2)
    const[b, updateB] = useState(5)
    const[result, updateResult] = useState("")
    const[motd, updateMotd] = useState("")

    function addNumbers() {
        fetch("http://localhost:4000/add/", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({a, b})
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            updateResult(json.result)
        })
    }

    useEffect(() => {
        fetch("http://localhost:4000/random")
        .then(res => res.json())
        .then(json => {
            updateMotd(json.random)
        })
    }, [])


    return (
        <div className="adder">
            <input type="number" value={a} onChange={e => updateA(parseInt(e.target.value))}></input>
            <input type="number" value={b} onChange={e => updateB(parseInt(e.target.value))}></input>
            <button onClick={() => addNumbers()}>ADD!</button>
            <p>result: {result}</p>
            <p> random: {motd}</p>
        </div>
    )
}