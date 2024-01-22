import useFetch from "./useFetch";
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Edit = () => {
  const {id} = useParams();
  const {data: blog, error, isPending} = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Mario');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setAuthor(blog.author);
    }
  }, [blog]);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updateBlog = {title, body, author};

    fetch(`http://localhost:8000/blogs/${id}`,
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateBlog)
      })
      .then(() => {
        history.push('/')
      })
      .catch(err => {
        console.error('Error updating blog:', err);
      })
  }
  const handleCancel = () => {
    history.push('/')
  }
  return (
    <div className="edit">
      <h2>Edit {blog && blog.title}</h2>
      <form onSubmit={handleEditSubmit}>
        <label htmlFor="title">Blog title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="body">Blog body:</label>
        <textarea
          placeholder="Body blog!"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label htmlFor="author">Blog author:</label>
        <select
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Mario">Mario</option>
          <option value="Bakhodur">Bakhodur</option>
        </select>

        {!isPending && <button type="submit">Save</button>}
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}
export default Edit;