import { useNavigate } from "react-router-dom"
const Header = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username")
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
        <header className="bg-secondary d-flex justify-content-between">
            <div>
                <div className="d-inline m-1">
                    {localStorage.getItem("token") && <button className="btn btn-secondary fs-1" onClick={handleMain}>Home</button>}
                </div>
                <div className="d-inline m-1">
                    {localStorage.getItem("token") && <button className="btn btn-secondary fs-1" onClick={handlePost}>Add Posting</button>}
                </div>
            </div>
            <div>
                <div className="d-inline m-1">
                    {localStorage.getItem("token") && <button className="btn btn-secondary fs-1 disabled" onClick={handleLogout}>{username}</button>}
                </div>
                <div className="d-inline m-1">
                    {localStorage.getItem("token") && <button className="btn btn-secondary fs-1" onClick={handleLogout}>Log Out</button>}
                </div>
            </div>
            
        </header>
    )
}

export default Header