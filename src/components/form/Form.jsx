import { useState } from "react"
import axios from "axios"
import { url } from "../../utilities/backend"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";

const Form = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: "",
        description: "",
        image: "",
        price: 0,
        creator: jwtDecode(localStorage.getItem("token")).id
    })

    const handleChange = (e)=>{
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/posts`, post, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            });
            navigate('/');
          } catch (err) {
            console.error(err);
          }
    }
    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
                <div>
                    <input name="title" id="title" type="text" placeholder="Title" value={post.title} onChange={handleChange}/>
                </div>
                <div>
                    <textarea name="description" id="description" placeholder="Description" value={post.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <input name="price" id="price" type="number" placeholder="Price" value={post.price} onChange={handleChange}/>
                </div>
                <div>
                    <input name="image" id="image" type="text" placeholder="Image Url" value={post.image} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">Post</button>
                </div>
            </fieldset>
        </form>
    )
}

export default Form