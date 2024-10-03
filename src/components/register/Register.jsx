import { useState } from "react"
import axios from "axios"
import { url } from "../../utilities/backend"
import { useNavigate } from "react-router-dom"
const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPasword: ""
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
            const res = await axios.post(`${url}/users/register`, user);
            console.log(res)
            localStorage.setItem('token', res.data.token);
            navigate('/');
          } catch (err) {
            console.error(err);
          }
    }
    return(
        <form onSubmit={handleSubmit}> 
            <fieldset>
                <div>
                    <input type="text" name="username" id="username" placeholder="Username" value={user.username} onChange={handleChange}/>
                </div>
                <div>
                    <input type="email" name="email" id="email" placeholder="Email" value={user.email} onChange={handleChange}/>
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChange}/>
                </div>
                <div>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" value={user.confirmPassword} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
                <div>
                    <a href="/login">Have an account?</a>
                </div>
            </fieldset>
        </form>
    )
}

export default Register