import React, { Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import Html from 'slate-html-serializer';
import { rules } from './rules';
// Create a new serializer instance with our `rules`
const html = new Html({ rules })

import { handleRenderMark, handleRenderBlock } from './renderes';

import HoverMenu from './HoverMenu';
import { initialValue } from './initialValue';
import ControllMenu from './ControllMenu';

// Define our app...
class SlateEditor extends React.Component {
  // Set the initial value when the app is first constructed.
  state = {
    value: html.deserialize('<p>Holis</p>')
  }

  menuRef = React.createRef();

  // On change, update the app's React state with the new editor value.
  handleOnChange = ({ value }) => {
    this.setState({ value })
  }

  handleOnKeyDown = (event, change, next) => {
    const { isloadingdata } = this.props;

    if (!isloadingdata && (event.which === 83 && event.ctrlKey)){
      event.preventDefault()
      this.handleSaveBlog();
      return;
    }

    next()
  }

  /**
   * On update, update the menu.
   */

  componentDidMount = () => {
    const valueFromProps = this.props.initialValue;

    const value = valueFromProps ? html.deserialize(valueFromProps) : initialValue
    this.updateMenu();
    this.setState({ value })
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
  }

  getHeadingValues = () => {
    const { value } = this.state;

    const firstBlock = value.document.getBlocks().get(0);
    const secondBlock = value.document.getBlocks().get(1);

    const title = firstBlock && firstBlock.text ? firstBlock.text : 'No Title';
    const subTitle = secondBlock && secondBlock.text ? secondBlock.text : 'No Subtitle';

    return {
      title,
      subTitle
    }
  };

  /**
   * Save the new blog.
   */

  handleSaveBlog = () => {
    const { value } = this.state;

    const { isloadingdata, saveblog } = this.props;

    const headingValues = this.getHeadingValues();
    const text = html.serialize(value);
    debugger;

    !isloadingdata && saveblog(text, headingValues);
  }

  /**
   * Render the editor.
   *
   * @param {Object} props
   * @param {Function} next
   * @return {Element}
   */

  handleRenderEditor = (props, editor, next) => {
    const children = next();

    const { isloadingdata, isnew } = props;

    return (
      <Fragment>
        {isnew ? 
          <ControllMenu
            action={'Save'}
            isLoadingData={isloadingdata}
            saveBlog={this.handleSaveBlog}/>
        :
          <ControllMenu
            action={'Update'}
            isLoadingData={isloadingdata}
            saveBlog={this.handleSaveBlog}/>
        }
        {children}
        <HoverMenu ref={this.menuRef} editor={editor} />
      </Fragment>
    )
  }

  // Render the editor.
  render() {
    return (
      <Fragment>
        <Editor {...this.props}
          placeholder='Enter some text...'
          value={this.state.value}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          renderEditor={this.handleRenderEditor}
          renderMark={handleRenderMark}
          renderBlock={handleRenderBlock}
        />
      </Fragment>
    )
  }
}

export default SlateEditor;