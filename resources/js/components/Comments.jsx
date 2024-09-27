import React from 'react'
import './posts.css'

const Comments = ({ id, name, id_post, getCommentByIdPost }) => {


    const handleGetCommentByIdPost = () => {
        getCommentByIdPost(id_post);
    }
    /*
        const handleGet = () => {
            getPost(id);
        }
        const handleGetComments = () => {
            getPostComments(id);
        }
    
        */
    return (
        <tr>
            <th>
                <button onClick={handleGetCommentByIdPost}>Ver Comentario</button>
            </th>
            <th>{name}</th>


        </tr>


    )
}

export default Comments
