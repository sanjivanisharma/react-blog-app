import { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import databaseService from '../services/database'

import { Link } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([])

    const postCardElements = posts.map((post) => (
        <div key={post.$id} className='p-2 w-1/4'>
            <PostCard {...post} />
        </div>
    ))

    useEffect(() => {
        databaseService.getAllActivePosts([])
            .then((allPosts) => {
                if (allPosts) {
                    setPosts(allPosts.documents)
                }
            })
            .catch(error => console.log(error))
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                <Link to="add-post">
                                    No posts to read
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
