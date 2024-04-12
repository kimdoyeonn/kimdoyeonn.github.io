import { defineDocumentType, makeSource, ComputedFields } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'post/**/(*.mdx|*.md)',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/post/${post._raw.flattenedPath}` },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
  },
}))

export default makeSource({ contentDirPath: 'data', documentTypes: [Post] })
