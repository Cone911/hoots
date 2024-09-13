import { useParams, Link } from "react-router-dom";
import CommentFormPage from "../CommentFormPage/CommentFormPage";

export default function HootDetailsPage(props) {
  const { hootId } = useParams();

  const hoot = props.hoots.find((hoot) => hoot._id === hootId);

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          {hoot.author?.name} posted on
          {new Date(hoot.createdAt).toLocaleDateString()}
        </p>
        {hoot.author._id === props.user._id && (
          <>
             <Link to={`/hoots/${hootId}/edit`}>Edit</Link> &nbsp;
            <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>
          </>
        )}
      </header>
      <p>{hoot.text}</p>
      <section>
        <h2>Comments</h2>
        <CommentFormPage handleAddComment={props.handleAddComment} hootId={hootId}/>
        {!hoot.comments.length && <p>There are no comments.</p>}
        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.name} posted on &nbsp;
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
