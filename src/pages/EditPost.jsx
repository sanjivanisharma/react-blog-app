import { Container, PostForm } from "../components"

import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export default function EditPost() {
    const posts = useSelector(state => state.post.posts)
    const { slug } = useParams()

    const post = posts.find(singlePost => singlePost.$id === slug)

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}