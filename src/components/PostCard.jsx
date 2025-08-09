import { Link } from 'react-router-dom'

function PostCard({
    $id = "123",
    title = "Modest Explorer",
    featuredImage = "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png"
}) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={featuredImage} alt={title}
                        className='rounded-xl' />

                </div>
                <h2
                    className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
    )
}


export default PostCard