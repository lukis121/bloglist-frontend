import blogService from '../services/blogs'

const BlogForm = (props) => {
    const handleNewBlogSubmit = async (event) => {
        event.preventDefault();
        try {
            props.blogFormRef.current.toggleVisibility();
            console.log(props.title, props.author, props.url)
            const blog = {title: props.title, author: props.author, url: props.url}
            const newBlog = await blogService.createNew(blog)
            console.log(newBlog)
            props.setTitle('');
            props.setAuthor('');
            props.setUrl('');
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
                value={props.title}
                onChange={({target}) => {props.setTitle(target.value)}}
                />
            </div>
            <div>
                author:
                <input
                type='text'
                name='Author'
                value={props.author}
                onChange={({target}) => {props.setAuthor(target.value)}}
                />

            </div>
            <div>
                url:
                <input
                type='text'
                name='Url'
                value={props.url}
                onChange={({target}) => {props.setUrl(target.value)}}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default BlogForm