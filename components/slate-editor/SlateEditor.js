import React, { Fragment } from 'react';
import { Editor } from 'slate-react';
import { handleRenderMark, handleRenderBlock } from './renderes';

import HoverMenu from './HoverMenu';
import { initialValue } from './initialValue';

// Define our app...
class SlateEditor extends React.Component {
  // Set the initial value when the app is first constructed.
  state = {
    value: initialValue,
  }

  menuRef = React.createRef();

  // On change, update the app's React state with the new editor value.
  handleOnChange = ({ value }) => {
    this.setState({ value })
  }

  /**
   * On update, update the menu.
   */

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  /**
   * Update the menu's absolute position.
   */

  updateMenu = () => {
    const menu = this.menuRef.current
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`

    console.log('Menu')
  }

  /**
   * Render the editor.
   *
   * @param {Object} props
   * @param {Function} next
   * @return {Element}
   */

  handleRenderEditor = (props, editor, next) => {
    const children = next()
    return (
      <Fragment>
        {children}
        <HoverMenu ref={this.menuRef} editor={editor} />
      </Fragment>
    )
  }

  // Render the editor.
  render() {
    return (
      <Fragment>
        <Editor
          placeholder='Enter some text...'
          value={this.state.value}
          onChange={this.handleOnChange}
          renderEditor={this.handleRenderEditor}
          renderMark={handleRenderMark}
          renderBlock={handleRenderBlock}
        />
      </Fragment>
    )
  }
}

export default SlateEditor;