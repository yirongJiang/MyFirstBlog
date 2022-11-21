import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
export const  MarkdownComponents = {
  code({ node, inline, className, children, ...props }) {
    /*
      node:
*/
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
    ) : (
      <code className={className} {...props} />
    )
  },
  h3(props) {
    console.log(props)
    // eslint-disable-next-line jsx-a11y/heading-has-content
    return <h3 style={{ color: 'red' }} {...props} />
  }

}
// 解析器
