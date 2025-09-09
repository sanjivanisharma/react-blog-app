import { deletePostStore } from "../store/postSlice"
import databaseService from "../services/database"
import storageService from "../services/storage"
import { Button, Container } from "../components"

import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import parse from "html-react-parser"

export default function Post() {
    const userData = useSelector(state => state.auth.userData)
    const posts = useSelector(state => state.post.posts)
    const { slug } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const post = posts.length > 0 ? posts.find(singlePost => singlePost.$id === slug) : null
    const isAuthor = post && userData ? post.userId === userData.$id : false

    const deletePost = () => {
        databaseService.deletePost(slug)
            .then((message) => {
                if (message) {
                    storageService.deleteFile(post.featuredImage)
                    dispatch(deletePostStore({ postId: slug }))
                    navigate("/")
                }
            })
            .catch(error => console.log(error))
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full mb-6">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                </div>
                {isAuthor && (
                    <div className="flex justify-end mb-4">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={storageService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}