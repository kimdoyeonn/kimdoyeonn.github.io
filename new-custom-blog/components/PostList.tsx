import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from 'contentlayer/generated'

const PostCard = ({ post }: { post: Post }) => {
  const isDefaultThumbnail = true
  return (
    <Link
      href="/"
      className="px-4 py-2 grid sm:grid-cols-8 grid-cols-1 gap-1 sm:gap-6 group cursor-pointer flex-col sm:flex-row"
    >
      <div className="sm:col-span-3 col-span-1 flex items-center justify-center">
        {isDefaultThumbnail ? (
          <div className="flex justify-center items-center w-full h-32 rounded bg-indigo-400/35 transition group-hover:bg-indigo-400/40">
            <div className="text-6xl group-hover:text-7xl transition duration-100 transform group-hover:scale-105">
              🌕
            </div>
          </div>
        ) : (
          <div className="w-full h-32 rounded bg-indigo-400/35 transition group-hover:bg-indigo-400/40">
            <Image src="" width="100" height="100" alt="title" />
          </div>
        )}
      </div>
      <div className="sm:col-span-5 col-span-1 flex h-full py-1 items-start flex-col gap-1.5">
        <div className="relative overflow-hidden w-fit pb-0.5">
          <h3
            className={clsx(
              'text-lg font-semibold line-clamp-1',
              'after:transition after:duration-300 after:transform after:scale-x-0 after:origin-left',
              "group-hover:after:content-[''] group-hover:after:scale-x-100 group-hover:after:-bottom-[1px] group-hover:after:absolute group-hover:after:left-0 group-hover:after:bg-white group-hover:after:w-full group-hover:after:h-1"
            )}
          >
            {post.title}
          </h3>
        </div>
        {post.summary ?? <p className="text-sm text-gray-200 line-clamp-3">{post.summary}</p>}
      </div>
    </Link>
  )
}

const PostList = ({ posts = [] }: { posts: any[] }) => {
  return (
    <div className="flex flex-col w-full">
      {posts.map((post: any) => (
        <PostCard post={post} />
      ))}
    </div>
  )
}

export default PostList
