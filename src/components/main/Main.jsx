import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Posts from "./Posts";
const Main = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("login")
        }
    }, [navigate])

    return(
        <Posts/>
    )
}

export default Main