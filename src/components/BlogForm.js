import blogService from '../services/blogs'
import { useState } from 'react'

const BlogForm = (props) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleNewBlogSubmit = async (event) => {
        event.preventDefault();
        try {
            props.blogFormRef.current.toggleVisibility();
            // console.log(props.title, props.author, props.url)
            const blog = {title, author, url}
            const newBlog = await blogService.createNew(blog)
            console.log(newBlog)
            setTitle('');
            setAuthor('');
            setUrl('');
            props.setBlogs(props.blogs.concat(newBlog))  
            props.setMessage('Blog created successfully');
            props.setIsError(false);
            setTimeout(() => {
                props.setMessage(null);
            }, 3000);
        } catch(err) {
            props.setMessage(err.message);
            props.setIsError(true);
            setTimeout(() => {
                props.setMessage(null);
            }, 3000);
        }
    }
    return (
        <form onSubmit={handleNewBlogSubmit}>
            <div>
                title:
                <input
                type='text'
                name='Title'
                value={title}
                onChange={({target}) => {setTitle(target.value)}}
                />
            </div>
            <div>
                author:
                <input
                type='text'
                name='Author'
                value={author}
                onChange={({target}) => {setAuthor(target.value)}}
                />

            </div>
            <div>
                url:
                <input
                type='text'
                name='Url'
                value={url}
                onChange={({target}) => {setUrl(target.value)}}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default BlogForm