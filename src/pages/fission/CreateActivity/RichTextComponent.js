import React, { Component } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { connect } from 'dva';

@connect(({ active_info }) => ({
    active_info
}))
class RichTextComponent extends Component {
    state = {
        // 创建一个空的editorState作为初始值
        editorState: null
    }

    async componentDidMount() {
        const { dispatch, active_info: { formField } } = this.props;
        let htmlContent = "<p></p>"
        if (formField['row[active_content]'] !== undefined && formField['row[active_content]'] !== '') {
            htmlContent = formField['row[active_content]']
        }
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        this.setState({
            editorState: BraftEditor.createEditorState(htmlContent)
        })

        // console.log(BraftEditor.createEditorState(formField['row[active_content]']), 123);

        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[active_content]': JSON.stringify(BraftEditor.createEditorState(htmlContent))
                }
            }
        })
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
        const { dispatch, active_info: { formField } } = this.props;
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[active_content]': editorState.toHTML()
                }
            }
        })
    }

    clearContent = () => {
        this.setState({
            editorState: ContentUtils.clear(this.state.editorState)
        })
        const { dispatch, active_info: { formField } } = this.props;
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[active_content]': JSON.stringify(ContentUtils.clear(this.state.editorState))
                }
            }
        })
    }

    insertText = () => {
        this.setState({
            editorState: ContentUtils.insertText(this.state.editorState, 'Hello World!')
        })
        const { dispatch, active_info: { formField } } = this.props;
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[active_content]': JSON.stringify(ContentUtils.insertText(this.state.editorState, 'Hello World!'))
                }
            }
        })
    }

    render() {
        const { editorState } = this.state;
        const extendControls = [
            {
                key: 'clear-editor',
                type: 'button',
                text: '清空编辑器',
                onClick: this.clearContent
            }, {
                key: 'insert-text',
                type: 'button',
                text: '插入自定义文本',
                onClick: this.insertText
            }
        ]

        return (
            <BraftEditor
                style={{ border: '1px solid #ccc' }}
                contentStyle={{ height: 'auto', maxHeight: 400 }}
                value={editorState}
                onChange={this.handleEditorChange}
                onSave={this.submitContent}
                extendControls={extendControls}
            />
        );
    }
}

export default RichTextComponent;