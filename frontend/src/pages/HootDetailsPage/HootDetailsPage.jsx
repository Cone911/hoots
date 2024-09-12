import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as hootService from "../../services/hootService";
import CommentFormPage from '../CommentFormPage/CommentFormPage';

export default function HootDetailsPage(props) {
  const { hootId } = useParams();
  console.log("hootId", hootId);

  const [hoot, setHoot] = useState(null);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      console.log("hootData: ", hootData);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);

  console.log("hoot state:", hoot);

  if (!hoot) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          {hoot.author.name} posted on
          {new Date(hoot.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{hoot.text}</p>
      <section>
        <h2>Comments</h2>
        <CommentFormPage handleAddComment={handleAddComment}/>
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
