import { Container, PostCard } from "."

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function UserPosts() {
    const allPosts = useSelector(state => state.post.posts)
    const userData = useSelector(state => state.auth.userData)
    const posts = allPosts.filter(post => post.userId === userData.$id)

    const postCardElements = posts.map((post) => (
        <div key={post.$id} className='w-full'>
            <PostCard {
                ...{
                    $id: post.$id,
                    title: post.title,
                    featuredImage: post.featuredImage,
                    status: post.status,
                    authorName: post.userName,
                    createdAt: post.$createdAt,
                    profilePage: true
                }} />
        </div>
    ))

    if (posts.length === 0) {
        return (
            <div className='w-full'>
            <Container>
                <section className='max-w-3xl text-2xl mx-auto py-6'>
                    You don't have any posts yet. <Link to='/add-post' className="underline">Start Writing.</Link>
                </section>
            </Container>
        </div>
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