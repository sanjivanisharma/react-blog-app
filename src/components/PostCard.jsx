import storageService from "../services/storage"
import { deletePostStore } from "../store/postSlice"
import databaseService from "../services/database"

import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEye, faEyeSlash, faBookmark as fasFaBookmark, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons"


function PostCard({ $id, title, featuredImage, status, authorName, createdAt, profilePage = false }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deletePost = () => {
        databaseService.deletePost($id)
            .then(() => {
                storageService.deleteFile(featuredImage)
                dispatch(deletePostStore({ postId: $id }))
            })
            .catch(error => console.log(error))
    }

    return (
        <article className='card'>
            <Link
                to={`/post/${$id}`}
                className="no-underline"
            >
                <div className='flex items-start gap-4'>
                    <div className='flex-1 min-w-0'>
                        {!profilePage && <div className='meta mb-2 flex gap-1 items-center'>
                            <FontAwesomeIcon icon={faCircleUser} />
                            <span>{authorName || 'Author'}</span>
                        </div>}
                        <h2 className={`text-xl md:text-2xl font-extrabold line-clamp-2 ${profilePage && 'mt-4'}`}>{title}</h2>
                    </div>
                    {featuredImage && (
                        <img
                            src={storageService.getFilePreview(featuredImage)}
                            alt={`Image of post ${title}`}
                            className='rounded-lg w-28 h-28 object-cover flex-shrink-0 hidden sm:block'
                        />
                    )}
                </div>
            </Link>
            <div className='meta mb-2 flex gap-5 items-center'>
                <time>{createdAt ? new Date(createdAt).toDateString().slice(4) : ''}</time>
                {profilePage ?
                    <>
                        {/* <FontAwesomeIcon
                            icon={status === "active" ? faEyeSlash : faEye}
                            size="s"
                            className="hover:text-black cursor-pointer"
                        /> */}
                        <FontAwesomeIcon
                            icon={faPen}
                            size="s"
                            className="hover:text-black cursor-pointer"
                            onClick={() => navigate(`/edit-post/${$id}`)}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            size="s"
                            className="hover:text-black cursor-pointer"
                            onClick={deletePost}
                        />
                    </> :
                    <>
                        {/* <FontAwesomeIcon
                            icon={farFaBookmark}
                            size="s"
                            className="hover:text-black cursor-pointer"
                        /> */}

                    </>
                }
            </div>
        </article >
    )
}

export default PostCard