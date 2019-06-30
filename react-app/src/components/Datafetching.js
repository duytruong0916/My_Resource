import React, {useEffect, useState} from 'react'
import Axios from 'axios';

function Datafetching() {
    const [post, setPosts] = useState({})
    const [ID, setID] = useState(1)
    const [IDonclick, setIDonclick] = useState(1)
    useEffect(()=>{
        Axios.get(`https://jsonplaceholder.typicode.com/posts/${IDonclick}`)
        .then(res=>{
            console.log(res)
            setPosts(res.data)})
        .catch(err => {console.log(err)})
    }, [IDonclick])
    const clickhandler = () => {
        setIDonclick(ID)
    }
    return (
        <div>
            <input type = 'text' value = {ID} onChange = {e => setID(e.target.value)}></input>
            <button type = 'button' onClick = {clickhandler}>Submit</button>
            <ul>
                
              <li>{post.title}</li>)
                
            </ul>
        </div>
    )
}

export default Datafetching
