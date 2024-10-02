import { useLocation } from "react-router-dom"
import { url } from "../../utilities/backend"
import axios from "axios"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import Comments from "./Comments"

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

    const [comment, setComment] = useState({
        content: "",
        creator: jwtDecode(localStorage.getItem("token")).id,
        post: postId
    })

    const handleChange = (e)=>{
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/comments`, comment,  {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            })
          } catch (err) {
            console.error(err);
          }
    }
    return(
        <section>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.image} />
            <article>{post.description}</article>
            <p>{post.username}</p>
            <button>{post.price} eur</button>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div>
                        <textarea name="content" id="content" placeholder="Comment" value={comment.content} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <button type="submit">Post Comment</button>
                    </div>
                    </fieldset>
            </form>
            <article>
                {post.comments && <Comments comments={post.comments}/>}
            </article>
        </section>
    )
}

export default PostPage