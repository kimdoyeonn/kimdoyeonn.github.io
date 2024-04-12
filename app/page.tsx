import Home from './home';
import { allPosts, Post } from '@contentlayer/generated';

const Page = () => {
  const posts = allPosts
    .filter((blog) => blog.draft === false)
    .sort((b1, b2) => Date.parse(b2.date) - Date.parse(b1.date));
  return <Home posts={posts} />;
};

export default Page;
