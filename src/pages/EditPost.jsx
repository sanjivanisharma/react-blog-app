import { useState, useEffect } from "react"

import { Container, PostForm } from "../components"
import databaseService from "../services/database"

import { useNavigate, useParams } from "react-router-dom"

export default function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug)
                .then((dbPost) => {
                    if (dbPost)
                        setPost(dbPost)
                })
                .catch(error => console.log(error))
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}