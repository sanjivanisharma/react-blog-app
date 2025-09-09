import { useEffect } from 'react'
import { Container, PostCard } from '../components'
import { setPostsStore } from "../store/postSlice"
import databaseService from '../services/database'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'

export default function Home() {
    const posts = useSelector(state => state.post.posts)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loaderStyle = {
        display: "block",
        margin: "10% auto"
    }

    const postCardElements = posts.map((post) => (
        <div key={post.$id} className='p-2 w-1/4'>
            <PostCard {...post} />
        </div>
    ))

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        } else {
            databaseService.getAllActivePosts([])
                .then((allPosts) => {
                    if (allPosts) {
                        dispatch(setPostsStore({ documents: allPosts.documents }))
                    }
                })
                .catch(error => console.log(error))
        }
    }, [])

    if (posts.length === 0) {
        return (
            <ClipLoader
                loading={true}
                cssOverride={loaderStyle}
                size={100}
                aria-label="Loading Spinner"
            />
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
