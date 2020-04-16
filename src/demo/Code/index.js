import React from "react";
import CodeMirror from "codemirror";
// import 'codemirror/'
import "codemirror/lib/codemirror.css";
// 引入mode
import "codemirror/mode/javascript/javascript";
// 引入代码提示
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
// 上边两个是定义提示的前提，下边定义自动提示是哪种模式，此处为javascript
import "codemirror/addon/hint/javascript-hint";
// 引入keymap
import "codemirror/addon/comment/comment";
import "codemirror/keymap/sublime";
import "codemirror/theme/midnight.css";
import { Divider } from "antd";

class Code extends React.Component {
	constructor(props) {
		super(props);
		this.editor = null;
	}
	componentDidMount() {
		this.editor = CodeMirror.fromTextArea(this.codeDom, {
			keyMap: "sublime",
			indentUnit: 4,
			tabSize: 4,
			theme: "midnight",
			mode: "text/javascript",
			showCursorWhenSelecting: true,
			readOnly: this.props.readOnly,
			lineWrapping: true,
			matchBrackets: true,
			option: {
				autofocus: true
			}
		});
		this.editor.setValue(this.props.content || "code goes here...");
		this.editor.setSize(undefined, 700);
	}

	render() {
		return (
			<textarea
				className="code"
				ref={p => {
					this.codeDom = p;
				}}
			/>
		);
	}
}

export default Code;
