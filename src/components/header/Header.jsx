import { useNavigate } from "react-router-dom"
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    return(
        <header>
            <div>
                {localStorage.getItem("token") && <button onClick={handleLogout}>Log Out</button>}
            </div>
            
        </header>
    )
}

export default Header