import { useEffect } from 'react'
import { Container, PostCard } from '../components'
import { setPostsStore } from "../store/postSlice"
import { getPosts } from '../helpers/api'

import { Link, useLoaderData } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export function loader() {
    return getPosts()
}

export default function Home() {
    const posts = useLoaderData()
    const dispatch = useDispatch()

    const postCardElements = posts.map((post) => (
        <div key={post.$id} className='p-2 w-1/4'>
            <PostCard {...post} />
        </div>
    ))

    useEffect(() => {
        if(posts) {
            dispatch(setPostsStore({documents: posts}))
        }
    }, [posts, dispatch])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                <Link to="login">
                                    Login to read posts
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
