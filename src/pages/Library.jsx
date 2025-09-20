import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'

export default function Library() {
  const posts = useSelector(state => state.post.posts)
  const userData = useSelector(state => state.auth.userData)

  return (
    <div className='py-8'>
      <Container>
        <section className='max-w-3xl mx-auto'>
          <h1 className='text-3xl md:text-4xl font-extrabold'>Library</h1>
          <p className='meta mt-2'>Your saved posts.</p>
          <div className='mt-6'>
            {posts.length === 0 ? (
              <div className='meta'>No saved stories yet.</div>
            ) : (
              posts.map(post => (
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
            )}
          </div>
        </section>
      </Container>
    </div>
  )
}



