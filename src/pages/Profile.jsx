import { useSelector } from 'react-redux'
import { Container, UserPosts } from '../components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function Profile() {
  const userData = useSelector(state => state.auth.userData)

  return (
    <div className='py-8'>
      <Container>
        <section className='max-w-3xl mx-auto'>
          <h1 className='text-3xl md:text-4xl font-extrabold'>Profile</h1>
          <div className='mt-6 border rounded-xl p-6'>
            <div className='flex items-center gap-3'>
              <FontAwesomeIcon
                icon={faCircleUser}
                size='3x'
              />
              <div>
                <div className='text-xl font-bold'>{userData?.name || 'User'}</div>
                <div className='meta'>{userData?.email}</div>
              </div>
            </div>
            <div className='mt-6'>
              <p className='meta'>Member since {userData.registration ? new Date(userData.registration).toDateString().slice(4) : '-'}</p>
            </div>
          </div>
        </section>
      </Container>
      <UserPosts />
    </div>
  )
}



