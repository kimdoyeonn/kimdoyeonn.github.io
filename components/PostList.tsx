import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from 'contentlayer/generated';

const PostCard = ({ post }: { post: Post }) => {
  const isDefaultThumbnail = true;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className='grid flex-col grid-cols-1 gap-1 px-4 py-2 cursor-pointer sm:grid-cols-8 sm:gap-6 group sm:flex-row'
    >
      <div className='flex items-center justify-center col-span-1 sm:col-span-3 aspect-video'>
        {isDefaultThumbnail ? (
          <div className='flex items-center justify-center w-full h-full transition rounded bg-indigo-400/35 group-hover:bg-indigo-400/40'>
            <div className='transition duration-500 transform text-7xl group-hover:scale-150'>
              🌕
            </div>
          </div>
        ) : (
          <div className='w-full h-32 transition rounded bg-indigo-400/35 group-hover:bg-indigo-400/40'>
            <Image src='' width='100' height='100' alt='title' />
          </div>
        )}
      </div>
      <div className='sm:col-span-5 col-span-1 flex h-full py-1 items-start flex-col gap-1.5'>
        <div className='relative overflow-hidden w-fit pb-0.5'>
          <h3
            className={clsx(
              'text-lg font-semibold line-clamp-1',
              'after:transition after:duration-300 after:transform after:scale-x-0 after:origin-left',
              "group-hover:after:content-[''] group-hover:after:scale-x-100 group-hover:after:-bottom-[1px] group-hover:after:absolute group-hover:after:left-0 dark:group-hover:after:bg-white group-hover:after:bg-black group-hover:after:w-full group-hover:after:h-1"
            )}
          >
            {post.title}
          </h3>
        </div>
        {post.summary ?? (
          <p className='text-sm text-gray-200 line-clamp-3'>{post.summary}</p>
        )}
      </div>
    </Link>
  );
};

const PostList = ({ posts = [] }: { posts: any[] }) => {
  return (
    <div className='flex flex-col w-full'>
      {posts.map((post: Post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostList;
