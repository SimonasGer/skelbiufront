import Comment from "./Comment"

const Comments = (props) => {
    const comments = props.comments
    return(
        <section>
            <h2>Comments</h2>
            {comments.map(comment => (
                <Comment _id={comment}/>
            ))}
        </section>
    )
}

export default Comments