// Add a dictionary of mark tags.
const BLOCK_TAGS = {
  blockquote: 'block-quote',
  h1: 'heading-one',
  h2: 'heading-two',
  li: 'list-item',
  ol: 'numbered-list',
  p: 'paragraph',
  ul: 'bulleted-list'
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  code: 'code',
  em: 'italic',
  strong: 'bold',
  u: 'underlined',
}
export const rules = [
  {
    // Rules that handles blocks...
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'block',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case 'block-quote':
            return <blockquote>{children}</blockquote>
          case 'bulleted-list':
            return <ul>{children}</ul>
          case 'heading-one':
            return <h1>{children}</h1>
          case 'heading-two':
            return <h2>{children}</h2>
          case 'list-item':
            return <li>{children}</li>
          case 'numbered-list':
            return <ol>{children}</ol>
          case 'paragraph':
            return <p>{children}</p>
        }
      }
    },
  },
  // Rules that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'code':
            return <code>{children}</code>
          case 'italic':
            return <em>{children}</em>
          case 'underlined':
            return <u>{children}</u>
        }
      }
    },
  },
]