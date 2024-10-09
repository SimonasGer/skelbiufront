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
        setLoading(true)
        comment.content = ""
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
        <section className="container d-flex flex-column align-items-center w-100">
            <h2 className="fs-1 mt-4">{post.title}</h2>
            <div className="mb-5">
                <p className="d-inline fs-4">Created by:</p>
                <a className="d-inline fs-4" href={`/user/${post.creator ? post.creator._id : ''}`}>
                    {post.creator ? post.creator.username : 'Unknown User'}
                </a>
            </div>
            <div className="w-75 text-center">
                <img className="w-100" src={post.image} alt={post.image}/>
                <div className="w-100 my-5 fs-2" style={{height: "auto"}}>{post.description}</div>
            </div>
            <button className="btn btn-primary mb-3">{post.price} eur</button>
            <div>
                <span onClick={handleLike} style={{ color: like, fontSize: "40pt"}}>♥</span> {likes}
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset className="d-flex flex-column align-items-center">
                    <div className="my-3">
                        <textarea style={{height: 150, width: 400}}
                         name="content" id="content" placeholder="Comment" value={comment.content} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <button className="btn btn-primary" type="submit">Post Comment</button>
                    </div>
                </fieldset>
            </form>
            <article className="w-100">
                {post.comments && <Comments comments={post.comments} loading={setLoading}/>}
            </article>
        </section>
    )
}

export default PostPage