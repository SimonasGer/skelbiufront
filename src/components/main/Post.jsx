import { useNavigate } from "react-router-dom"
const Post = (props) => {
    const navigate = useNavigate();
    const handleExpand = () => {
        navigate(`/posting/${props._id}`)
    }
    return(
        <article>
            <button onClick={handleExpand}>{props.title}</button>
            <div>{props.description}</div>
            <div>{props.price}</div>
            <div>{props.image}</div>
        </article>
    )
}
export default Post