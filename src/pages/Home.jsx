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
    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loaderStyle = {
        display: "block",
        margin: "10% auto"
    }

    const postCardElements = posts.map((post) => (
        <div key={post.$id} className='w-full'>
            <PostCard {
                ...{
                    $id: post.$id,
                    title: post.title,
                    featuredImage: post.featuredImage,
                    status: post.status,
                    authorName: post.userName,
                    createdAt: post.$createdAt
                }} />
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
        <div className='w-full'>
            <Container>
                <section className='max-w-3xl mx-auto py-6'>
                    {postCardElements}
                </section>
            </Container>
        </div>
    )
}
