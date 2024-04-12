import Nav from '@/components/Nav'
import PostList from '@/components/PostList'
import Profile from '@/components/Profile'

export default function Home({ posts }: { posts: any }) {
  return (
    <main className="w-full">
      <Profile />
      <div className="mt-4">
        <PostList posts={posts} />
      </div>
    </main>
  )
}
