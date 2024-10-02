import { useNavigate } from "react-router-dom"
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    const handlePost = () => {
        navigate("/form")
    }
    const handleMain = () => {
        navigate("/")
    }
    return(
        <header>
            <div>
                {localStorage.getItem("token") && <button onClick={handleLogout}>Log Out</button>}
            </div>
            <div>
                {localStorage.getItem("token") && <button onClick={handlePost}>Add Posting</button>}
            </div>
            <div>
                {localStorage.getItem("token") && <button onClick={handleMain}>Home</button>}
            </div>
            
        </header>
    )
}

export default Header