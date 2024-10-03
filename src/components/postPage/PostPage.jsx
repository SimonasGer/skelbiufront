import { useLocation } from "react-router-dom"
import { url } from "../../utilities/backend"
import axios from "axios"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import Comments from "./Comments"

const PostPage = () => {
    const postId = useLocation().pathname.split("/")[2]
    const user = jwtDecode(localStorage.getItem("token")).id
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})
    const [likes, setLikes] = useState(0)
    const [like, setLike] = useState("black")


    useEffect(() => {
        const loadPost = async () => {
            try {
                await axios.get(`${url}/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                }).then((res) => {
                    setPost(res.data.data.post)
                    setLikes(res.data.data.post.likes.length)
                    let users = res.data.data.post.likes
                    for (let i of users) {
                        if (user === i._id){
                            setLike("green")
                            break
                        }
                    }
                })
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadPost()
            setLoading(false)
        }
    }, [loading, postId, user])

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

    const handleLike = async () => {
        if (like === "black"){
            setLike("green")
        } else {
            setLike("black")
        }
        try {
            await axios.post(`${url}/posts/${postId}`, {likes: user} ,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            }).then((res) => {
                setLikes(res.data.data.post.likes.length)
            })            
        } catch (error) {
            console.error(error)
        }
      }

    return(
        <section>
            <h2>{post.title}</h2>
            <div>
                <a href={`/user/${post.creator ? post.creator._id : ''}`}>
                    {post.creator ? post.creator.username : 'Unknown User'}
                </a>
            </div>
            
            <img src={post.image} alt={post.image}/>
            <article>{post.description}</article>
            <button>{post.price} eur</button>
            <div>
                <span onClick={handleLike} style={{ color: like}}>&#x2764;</span> {likes}
            </div>
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