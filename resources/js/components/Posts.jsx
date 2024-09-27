import React from 'react'
import './posts.css'

const Posts = ({ id, title, body, deletePost, getPost, getPostComments }) => {

    const handleDelete = () => {
        deletePost(id);
    }

    const handleGet = () => {
        getPost(id);
    }
    const handleGetComments = () => {
        getPostComments(id);
    }

    return (
        <tr>
            <th>
                <button onClick={handleGet}>Obtener</button>
                <button onClick={handleGetComments}>Comentarios</button>
                <button onClick={handleDelete}>Eliminar</button>
            </th>
            <th>{title}</th>
            <th>{body}</th>


        </tr>


    )
}

export default Posts
