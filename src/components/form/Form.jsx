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
        <div className="d-flex flex-column align-items-center">
            <h2 className="my-5 fs-1">Add a post</h2>
        
            <form className="my-5 w-100" onSubmit={handleSubmit}>
                <fieldset className="container d-flex justify-content-center ">
                    <div className="d-flex flex-column align-items-center w-50">
                        <input className="w-100 m-3 form-control" name="title" id="title" type="text" placeholder="Title" value={post.title} onChange={handleChange}/>
                        <textarea className="w-100 m-3 form-control" name="description" id="description" placeholder="Description" value={post.description} onChange={handleChange}></textarea>
                        <input className="w-100 m-3 form-control" name="price" id="price" type="number" placeholder="Price" value={post.price} onChange={handleChange}/>
                        <input className="w-100 m-3 form-control" name="image" id="image" type="text" placeholder="Image Url" value={post.image} onChange={handleChange}/>
                        <button className="w-100 m-3 btn btn-success" type="submit">Post</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Form