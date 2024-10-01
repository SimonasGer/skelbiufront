import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const Main = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("login")
        }
    }, [navigate])

    return(
        <h2>Skelbimai</h2>
    )
}

export default Main