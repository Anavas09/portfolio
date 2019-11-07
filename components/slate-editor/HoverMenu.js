import React from 'react'
import ReactDOM from 'react-dom'
//import initialValue from './value.json'
import { css } from 'emotion';
import { Menu } from './components';
import { MarkButton, BlockButton } from './renderes';

const HoverMenu = React.forwardRef(({ editor }, ref) => {
  const root = window.document.getElementById('__next')
  return ReactDOM.createPortal(
    <Menu
      ref={ref}
      className={css`
        padding: 8px 7px 6px;
        position: absolute;
        z-index: 1;
        top: -10000px;
        left: -10000px;
        margin-top: -6px;
        opacity: 0;
        background-color: #222;
        border-radius: 4px;
        transition: opacity 0.75s;
      `}
    >
      <MarkButton editor={editor} type="bold" icon="format_bold" />
      <MarkButton editor={editor} type="italic" icon="format_italic" />
      <MarkButton editor={editor} type="underlined" icon="format_underlined" />
      <MarkButton editor={editor} type="code" icon="code" />
      <BlockButton type='heading-one' icon='looks_one' editor={editor} />
      <BlockButton type='heading-two' icon='looks_two' editor={editor} />
      <BlockButton type='block-quote' icon='format_quote' editor={editor} />
      <BlockButton type='numbered-list' icon='format_list_numbered' editor={editor} />
      <BlockButton type='bulleted-list' icon='format_list_bulleted' editor={editor} /> 
    </Menu>,
    root
  )
})

export default HoverMenu;