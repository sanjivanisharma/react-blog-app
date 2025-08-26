import { Container, PostCard } from "../components"

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function userPosts() {
    const allPosts = useSelector(state => state.post.posts)
    const userData = useSelector(state => state.auth.userData)
    const posts = allPosts.filter(post => post.userId === userData.$id)

    const postCardElements = posts.map((post) => (
        <div key={post.$id} className='p-2 w-1/4'>
            <PostCard {...post} />
        </div>
    ))

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                <Link to="/add-post">
                                    Write your first post
                                </Link>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {postCardElements}
                </div>
            </Container>
        </div>
    )
}