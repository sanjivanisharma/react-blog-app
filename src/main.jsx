import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Post from './pages/Post.jsx'
import UserPosts from './pages/userPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import NotFound from './pages/NotFound.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/user-posts",
        element: <UserPosts />
      },
      {
        path: "/add-post",
        element: <AddPost />
      },
      {
        path: "/edit-post/:slug",
        element: <EditPost />
      },
      {
        path: "/post/:slug",
        element: <Post />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
