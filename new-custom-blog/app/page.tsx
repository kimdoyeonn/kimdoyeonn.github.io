import Home from './home'
import { allPosts, Post } from 'contentlayer/generated'

const Page = () => {
  const posts = allPosts
  return <Home posts={posts} />
}

export default Page
