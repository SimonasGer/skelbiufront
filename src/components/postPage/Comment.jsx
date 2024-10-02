import { useState, useEffect } from "react"
import axios from "axios"
import { url } from "../../utilities/backend"

const Comment = (props) => {
    const [loading, setLoading] = useState(true)
    const [comment, setComment] = useState({})

    useEffect(() => {
        const loadComment = async () => {
            try {
                const res = await axios.get(`${url}/comments/${props._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setComment(res.data.data.comment)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadComment()
            setLoading(false)
        }
    }, [loading, props._id])

    return(
        <article>
            
            <h2>{comment.content}</h2>
        </article>
    )
}

export default Comment