import { Container } from "../components"
import storageService from "../services/storage"

import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import parse from "html-react-parser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShareNodes, faUserCircle } from "@fortawesome/free-solid-svg-icons"

export default function Post() {
    const posts = useSelector(state => state.post.posts)
    const { slug } = useParams()

    const post = posts.length > 0 ? posts.find(singlePost => singlePost.$id === slug) : null

    return post ? (
        <div className="py-8">
            <Container>
                <article className="max-w-3xl mx-auto">
                    <header className="mb-6">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{post.title}</h1>
                        <div className="flex items-center justify-between mt-4">
                            <div className="meta mt-3 flex gap-4 items-center">
                                <span><FontAwesomeIcon icon={faUserCircle} /> {post.userName || 'Author'}</span>
                                <time>{post.$createdAt ? new Date(post.$createdAt).toDateString().slice(4) : ''}</time>
                                {/* <FontAwesomeIcon
                                    icon={faShareNodes}
                                    size="s"
                                    className="hover:text-black cursor-pointer"
                                /> */}
                            </div>
                        </div>
                    </header>
                    {post.featuredImage && (
                        <div className="w-full mb-6">
                            <img
                                src={storageService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl w-full h-auto object-cover"
                            />
                        </div>
                    )}
                    <div className="article-prose">
                        {parse(post.content, {
                            replace: (domNode) => {
                                if (domNode.name === "a") {
                                    return (
                                        <a
                                            href={domNode.attribs.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-blue-600"
                                        >
                                            {domNode.children[0].data}
                                        </a>
                                    )
                                }
                            },
                        })}
                    </div>
                </article>
            </Container>
        </div>
    ) : null;
}