import React, {Component} from 'react';
import Item from './Item';

class List extends Component {
    constructor (props, context) {
        super(props, context);
    }

    changeActive (id) {
        this.props.activeTodo(id);
    }

    deleteTodo (id) {
        this.props.deleteTodo(id);
    }

    saveTodo (id, text) {
        this.props.updateTodo(id, text);
    }

    render () {
        const {list} = this.props;
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {(list || []).map((value, key) => (
                    <Item
                        key={key}
                        changeActive = {this.changeActive.bind(this, value._id)}
                        deleteTodo = {this.deleteTodo.bind(this, value._id)}
                        saveTodo = {this.saveTodo.bind(this, value._id)}
                        num={key + 1}
                        data={value}
                    />
                ))}
                </tbody>
            </table>
        );
    }
}

export default List;
