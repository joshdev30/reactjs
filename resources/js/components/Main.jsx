import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Posts from "../components/Posts";
import Comments from "../components/Comments";


export default function LoadPage() {


    var post_new = {};

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const dialog_post = document.getElementById("post");
        const dialog_comments = document.getElementById("comments");

        dialog_post.querySelector("button.close").addEventListener("click", () => {
            dialog_post.close();
        });

        dialog_comments.querySelector("button.close").addEventListener("click", () => {
            dialog_comments.close();
        });

        fetchData();
        getUsers();
    }, []);



    const fetchData = async () => {
        await fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => {
                console.log(err);
            });
    };
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const getUsers = async () => {
        await fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => {
                console.log(err);
            });
    };

    console.log("users", users)
    const deletePost = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.status !== 200) {
                    return;
                } else {
                    setPosts(
                        posts.filter((post) => {
                            return post.id !== id;
                        })
                    );
                    alert(`Se eliminó el post ${id}`);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [post, setPost] = useState([]);
    const getPost = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "GET",
        }).then((res) => res.json())
            .then((data) => {
                setPost(data);

                let user = users.filter(user => user.id == data.userId).shift();
                setUser(user);
                document.getElementById("post").showModal();
                console.log(id, data, post)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [comments, setComments] = useState([]);
    const getPostComments = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
            method: "GET",
        }).then((res) => res.json())
            .then((data) => {
                let post = posts.filter((post) => {
                    return post.id === id;
                })[0]

                setPost(post);
                setComments(data)
                document.getElementById("comments").showModal();
                console.log(id, post)
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const [comment, setComment] = useState([]);
    const getCommentByIdPost = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, {
            method: "GET",
        }).then((res) => res.json())
            .then((data) => {
                setComment(data)
                console.log(id, data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const putPost = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify(post_new),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((res) => res.json())
            .then((data) => {
                setPost(data);
                let input = document.getElementById("body");
                input.value = "";
                console.log(id, data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePutPost = () => {
        putPost(post.id);
    }

    function setBody(el, post) {
        post.body = el.value;
        post_new = post;
    }


    return (
        <div>
            <h1>Posts</h1>
            <div className="scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Acciones</th>
                            <th>Titulo</th>
                            <th>Cuerpo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <Posts
                                id={post.id}
                                title={post.title}
                                body={post.body}
                                deletePost={deletePost}
                                getPost={getPost}
                                getPostComments={getPostComments}
                            />
                        ))}
                    </tbody>

                </table>
            </div>

            <dialog id="post">
                <div className="modalhead">
                    Post {post.id}
                    <button autoFocus className="close">Cerrar</button>
                </div>
                <div className="modalbody">

                    <input type="text" id="body" onChange={e => setBody(e.target, post)} />
                    <button type="button" onClick={handlePutPost}>Actualizar</button>

                    <div className="user">

                        <div className="container">
                            <label><b>Nombre:</b>&nbsp;{user.name}</label>
                            <label><b>Usuario:</b>&nbsp;{user.username}</label>
                            <label><b>Correo:</b>&nbsp;{user.email}</label>
                        </div>
                        <div className="container">
                            <label><b>Calle:</b>&nbsp;{user.address == undefined ? '' : user.address.street}</label>
                            <label><b>Suite:</b>&nbsp;{user.address == undefined ? '' : user.address.suite}</label>
                            <label><b>Ciudad:</b>&nbsp;{user.address == undefined ? '' : user.address.city}</label>
                            <label><b>Codigo Postal:</b>&nbsp;{user.address == undefined ? '' : user.address.zipcode}</label>
                            <label><b>Telefono:</b>&nbsp;{user.address == undefined ? '' : user.phone}</label>
                            <label><b>Pagina Web:</b>&nbsp;{user.address == undefined ? '' : user.website}</label>
                        </div>



                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>

            </dialog>

            <dialog id="comments">
                <div className="modalhead">
                    Comentarios Post {post.id}
                    <button autoFocus className="close">Cerrar</button>
                </div>
                <div className="modalbody">
                    <div className="scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Acciones</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment) => (
                                    <Comments
                                        id={comment.id}
                                        name={comment.name}
                                        id_post={post.id}
                                        getCommentByIdPost={getCommentByIdPost}
                                    />
                                ))}
                            </tbody>

                        </table>
                    </div>

                    <div>
                        {comment.body}
                    </div>
                </div>
            </dialog>

        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <LoadPage />
    </React.StrictMode>
);


