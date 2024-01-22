import {useHistory, useParams} from "react-router-dom";
import useFetch from "./useFetch";
import Modal from "./Modal";
import {useState} from "react";

const BlogDetails = () => {
  const {id} = useParams();
  const {data: blog, error, isPending} = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  }
  const handleDeleteConfirm = () => {
    fetch('http://localhost:8000/blogs/' + blog.id,
      {
        method: 'DELETE',
      })
      .then(() => {
        setIsModalOpen(false);
        history.push('/');
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  }
  const handleRedirectEditClick = () => {
    history.push('/blogs/edit/' + blog.id)
  }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>

          <div className="blog-details__actions">
            <button onClick={handleRedirectEditClick}>Edit blog</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        </article>
      )}
      {isModalOpen && (
        <Modal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  )
}

export default BlogDetails;