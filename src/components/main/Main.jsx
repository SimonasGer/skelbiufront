import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Posts from "./Posts";
const Main = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("login")
        }
    }, [navigate])

    const handleSearch = (e) => {
        setLoading(true)
        setSearch(`title=${e.target.value}`)
        if(e.target.value === ""){
            setSearch("")
        }
    }
    return(
        <main className="container">
            <div className="container">
                <input className="m-3" type="text" placeholder="Search" onChange={handleSearch}/>
            </div>
            <Posts search={search} loading={loading} setLoading={setLoading}/>
        </main>
    )
}

export default Main