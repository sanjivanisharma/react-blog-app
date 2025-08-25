import { Container, PostCard } from "../components"
import { useSelector } from 'react-redux'

export default function AllPosts() {
    const posts = useSelector(state => state.post.posts)

    const postCardElements = posts.map((post) => (
        <div key={post.$id} className='p-2 w-1/4'>
            <PostCard {...post} />
        </div>
    ))

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