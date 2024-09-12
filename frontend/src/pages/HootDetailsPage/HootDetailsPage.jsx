import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import * as hootService from "../../services/hootService";
import CommentFormPage from "../CommentFormPage/CommentFormPage";

export default function HootDetailsPage(props) {
  const { hootId } = useParams();

  const [hoot, setHoot] = useState(null);
  // const user = useContext(AuthedUserContext);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);

  if (!hoot) return <main>Loading...</main>;

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
        <CommentFormPage handleAddComment={handleAddComment} />
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
