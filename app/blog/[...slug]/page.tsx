import { allPosts } from '@/.contentlayer/generated'
import { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

const component: MDXComponents = {
  a: ({ href, children }) => (
    <a href={href as string} className="text-red">
      {children}
    </a>
  ),
}

const PostPage = ({ params }: { params: { slug: string[] } }) => {
  const slug = decodeURI(params.slug.join('/'))

  const post = allPosts.find((p) => p.slug === slug)
  const postContent = post?.body.code

  if (!postContent) {
    return notFound()
  }

  const MDXComponent = useMDXComponent(postContent)
  return (
    <article className="max-w-full p-4 prose mt-14 prose-gray dark:prose-invert prose-code">
      <div>
        <div className="mb-3 text-4xl font-black text-center">{post.title}</div>
        <div className="mb-16 text-right">{post.date.slice(0, 10)}</div>
      </div>
      <div>
        <MDXComponent component={component} />
      </div>
    </article>
  )
}

export default PostPage
