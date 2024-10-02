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
    return(
        <header>
            <div>
                {localStorage.getItem("token") && <button onClick={handleLogout}>Log Out</button>}
            </div>
            <div>
                {localStorage.getItem("token") && <button onClick={handlePost}>Add Posting</button>}
            </div>
            
        </header>
    )
}

export default Header