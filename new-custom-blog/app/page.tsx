import Nav from '@/components/Nav'
import PostList from '@/components/PostList'
import Profile from '@/components/Profile'

export default function Home() {
  return (
    <main className="w-full">
      <Nav />
      <Profile />
      <PostList />
    </main>
  )
}
