import React, {Component} from 'react';

class Item extends Component {

    constructor (props, context) {
        super(props, context);
        this.state = { edit: false };
    }

    saveText (event) {
        if (event.type === 'blur' || event.key === 'Enter') {
        	if (this.textInput.value.trim().length) {
            	this.props.saveTodo(this.textInput.value);
        	}
            this.setState({edit: !this.state.edit});
        }
    }

    changeTodoText () {
        this.setState({edit: !this.state.edit}, () => {
            this.textInput.focus();
        });
    }

    render () {
        const {num, data, changeActive, deleteTodo} = this.props;
        const {text, _id, done} = data;
        return (
			<tr>
				<th scope="row">
					<label className="checkbox-inline" htmlFor={`check_${_id}`}>
						<input
							type="checkbox"
							id={`check_${_id}`}
							defaultValue={_id}
							checked={done}
							onChange={changeActive}
						/>{num}
					</label>
				</th>
				<td>
					{
						this.state.edit && <input
							defaultValue={text}
							onBlur= {this.saveText.bind(this)}
							ref={(input) => { this.textInput = input; }}
							onKeyPress={this.saveText.bind(this)}
						/> || <span onDoubleClick= {this.changeTodoText.bind(this)}>{text}</span>
                    }
				</td>
				<td>
					<button type="button" className="btn btn-link" onClick={deleteTodo}>Delete</button>
				</td>
			</tr>
        );
    }
}

export default Item;
