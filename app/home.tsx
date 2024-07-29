import Nav from '@/components/Nav';
import PageComponent from '@/components/PageComponent';
import PostList from '@/components/PostList';
import Profile from '@/components/Profile';

export default function Home({ posts }: { posts: any }) {
  return (
    <PageComponent>
      {/* <Profile /> */}
      <div className='mt-4'>
        <PostList posts={posts} />
      </div>
    </PageComponent>
  );
}
