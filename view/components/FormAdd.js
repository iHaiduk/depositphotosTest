import React, {Component, PropTypes} from 'react';

class FormAdd extends Component {

    static propTypes = {
        addTodo: PropTypes.func.isRequired
    };

    constructor (props, context) {
        super(props, context);
    }

    enterHandler (event) {
        if (event.key === 'Enter') {
            const value = this.textInput.value.trim();
            if (value.length) {
                this.props.addTodo(this.textInput.value);
            }
            this.textInput.value = '';
        }
    }

    render () {
        return (
			<div className="form-horizontal">
				<div className="form-group">
					<label className="col-sm-2 control-label" htmlFor="task">New Task</label>
					<div className="col-sm-10">
						<input
							type="text"
							className="form-control"
							placeholder="New Task"
							id="task"
							ref={(input) => { this.textInput = input; }}
							onKeyPress={this.enterHandler.bind(this)}
						/>
					</div>
				</div>
			</div>
        );
    }
}

export default FormAdd;
