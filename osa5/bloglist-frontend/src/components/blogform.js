import React, {useState} from 'react'


const BlogForm = ({createBlog}) => {

    const [title, setTitle] = useState([''])
    const [author, setAuthor] = useState([''])
    const [url, setUrl] = useState([''])

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
          author: author,
          url: url,
          likes: 0
        })

      }
    
      const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
      }
    
      const handleTitleChange = (event) => {
        setTitle(event.target.value)
      }
    
      const handleUrlChange = (event) => {
        setUrl(event.target.value)
      }
    

    return (
        <form onSubmit={addBlog}>

            <div>
                title:
          <input
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                author:
          <input
                    value={author}
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
                url:
          <input
                    value={url}
                    onChange={handleUrlChange}
                />
            </div>
            <button type="submit">save</button>

        </form>

    )

 
}   
export default BlogForm