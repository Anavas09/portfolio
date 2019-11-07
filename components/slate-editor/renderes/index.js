import React from 'react';
import { Button, Icon } from '../components';

const DEFAULT_NODE = 'paragraph'

/**
 * Check if the any of the currently selected blocks are of `type`.
 *
 * @param {String} type
 * @param {Object} value
 * @return {Boolean}
 */

const hasBlock = (type, value) => {
  return value.blocks.some(node => node.type === type)
}

/**
 * When a block button is clicked, toggle the block type.
 *
 * @param {Event} event
 * @param {String} type
 * @param {Editor} editor
 */

const onClickBlock = (event, type, editor) => {
  event.preventDefault();

  const { value } = editor
  const { document } = value

  // Handle everything but list buttons.
  if (type !== 'bulleted-list' && type !== 'numbered-list') {
    const isActive = hasBlock(type, value)
    const isList = hasBlock('list-item', value)

    if (isList) {
      editor
        .setBlocks(isActive ? DEFAULT_NODE : type)
        .unwrapBlock('bulleted-list')
        .unwrapBlock('numbered-list')
    } else {
      editor.setBlocks(isActive ? DEFAULT_NODE : type)
    }
  } else {
    // Handle the extra wrapping required for list buttons.
    const isList = hasBlock('list-item', value)
    const isType = value.blocks.some(block => {
      return !!document.getClosest(block.key, parent => parent.type === type)
    })

    if (isList && isType) {
      editor
        .setBlocks(DEFAULT_NODE)
        .unwrapBlock('bulleted-list')
        .unwrapBlock('numbered-list')
    } else if (isList) {
      editor
        .unwrapBlock(
          type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
        )
        .wrapBlock(type)
    } else {
      editor.setBlocks('list-item').wrapBlock(type)
    }
  }
}

export const MarkButton = ({ editor, type, icon }) => {
  const { value } = editor
  const isActive = value.activeMarks.some(mark => mark.type === type)
  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={event => {
        event.preventDefault();
        editor.toggleMark(type);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

/**
 * Render a block-toggling toolbar button.
 *
 * @param {String} type
 * @param {String} icon
 * @param {Editor} editor
 * @return {JSX.Element}
 */

export const BlockButton = ({type, icon, editor}) => {
  const { value } = editor
  let isActive = hasBlock(type, value)

  if (['numbered-list', 'bulleted-list'].includes(type)) {
    const { document, blocks } = value

    if (blocks.size > 0) {
      const parent = document.getParent(blocks.first().key)
      isActive = hasBlock('list-item', value) && parent && parent.type === type
    }
  }

  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={event => onClickBlock(event, type, editor)}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

/**
 * Render a Slate block.
 *
 * @param {Object} props
 * @return {Element}
 */

export const handleRenderBlock = (props, editor, next) => {
  const { attributes, children, node } = props

  switch (node.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'paragraph':
      return <p {...attributes}>{children}</p>
    default:
      return next()
  }
}

/**
 * Render a Slate mark.
 *
 * @param {Object} props
 * @param {Editor} editor
 * @param {Function} next
 * @return {Element}
 */

export const handleRenderMark = (props, editor, next) => {
  const { children, mark, attributes } = props

  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'code':
      return <code {...attributes}>{children}</code>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underlined':
      return <u {...attributes}>{children}</u>
    default:
      return next()
  }
}