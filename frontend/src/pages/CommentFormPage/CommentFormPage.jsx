import { useState, useEffect } from 'react';
import * as commentService from '../../services/commentService';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const updatedHoot = await commentService.create(props.hootId, formData);
        props.handleAddComment(updatedHoot);
        setFormData({ text: '' });
    };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;
