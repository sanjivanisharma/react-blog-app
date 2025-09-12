import storageService from "../services/storage"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full flex flex-col items-center bg-gray-100 rounded-xl p-4'>
                <div className='flex justify-center items-center w-full mb-4'>
                    <img
                        src={storageService.getFilePreview(featuredImage)}
                        alt={`Image of post ${title}`}
                        className='rounded-xl max-h-48 min-h-48 object-contain'
                    />

                </div>
                <h2
                    className='text-xl font-bold text-center'
                >{title}</h2>
            </div>
        </Link>
    )
}


export default PostCard