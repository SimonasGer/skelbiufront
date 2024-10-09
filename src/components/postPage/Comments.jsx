import Comment from "./Comment"

const Comments = (props) => {
    const comments = props.comments
    return(
        <div className="w-100 my-5">
            <h2 className="text-center">Comments</h2>
            <div className="d-flex justify-content-around flex-wrap">
                {comments.map(comment => (
                    <Comment _id={comment}/>
                ))}
            </div>
        </div>
    )
}

export default Comments