import { useState, useEffect } from "react"

import { Container, PostCard } from "../components"
import databaseService from "../services/database"

export default function AllPosts() {
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