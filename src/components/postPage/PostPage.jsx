import { useLocation } from "react-router-dom"
import { url } from "../../utilities/backend"
import axios from "axios"
import { useState, useEffect } from "react"
const PostPage = () => {
    const postId = useLocation().pathname.split("/")[2]

    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})
    useEffect(() => {
        const loadPost = async () => {
            try {
                const res = await axios.get(`${url}/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setPost(res.data.data.post)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadPost()
            setLoading(false)
        }
    }, [loading, postId])

    return(
        <section>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.image} />
            <article>{post.description}</article>
            <p>{post._id}</p>
            <button>{post.price}</button>
            <article>

            </article>
        </section>
    )
}

export default PostPage