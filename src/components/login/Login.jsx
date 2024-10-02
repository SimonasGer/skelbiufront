import { useState } from "react"
import axios from "axios"
import { url } from "../../utilities/backend"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/users/login`, user);
            localStorage.setItem('token', res.data.data.token);
            navigate('/');
          } catch (err) {
            console.error(err);
          }
    }
    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
                <div>
                    <input type="email" name="email" id="email" placeholder="Email" value={user.email} onChange={handleChange}/>
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
                <div>
                    <a href="/register">Don't have an account?</a>
                </div>
            </fieldset>
        </form>
    )
}

export default Login