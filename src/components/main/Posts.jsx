import { useEffect, useState } from "react"
import axios from "axios";
import { url } from "../../utilities/backend";
import Post from "./Post";
const Posts = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const res = await axios.get(`${url}/posts`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                console.log(res.data.data.posts)
                setPosts(res.data.data.posts)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadPosts()
            setLoading(false)
        }
    }, [loading])

    return(
        <section>
            {posts.map(post => (
                <Post title={post.title} description={post.description} price={post.price} image={post.image} _id={post._id}/>
            ))}
        </section>
    )
}
export default Posts