import React, {Component} from 'react';

class Navbar extends Component {

    constructor (props, context) {
        super(props, context);
        this.state = {
            buttons: [
                {
                    type: 'default',
                    name: 'All',
                    active: true
                },
                {
                    type: 'primary',
                    name: 'Active',
                    active: false
                },
                {
                    type: 'success',
                    name: 'Completed',
                    active: false
                }
            ]
        };
    }

    changeFilter (index) {
        const buttons = this.state.buttons.map((val, key) => {
            val.active = key === index;
            return val;
        });
        this.props.filterUpdate(index === 0 ? null : index !== 1);
        this.setState({buttons});
    }

    clearComplete () {
        this.props.clearCompleted();
    }

    render () {
        const {count, showButton} = this.props;
        const {buttons} = this.state;
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <h5>{count} items left</h5>
                        <div className="btn-group" role="group">
                            {buttons.map((b, k) => (
                                <button key={k} type="button" className={`btn btn-${b.type}${b.active ? ' btn-warning' : ''}`} onClick={this.changeFilter.bind(this, k)}>{b.name}</button>
                            ))}
                            {!!showButton && <button type="button" className="btn btn-danger" onClick={this.clearComplete.bind(this)}>Clear completed</button> }
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
