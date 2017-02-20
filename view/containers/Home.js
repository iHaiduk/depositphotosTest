import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as Actions from './../../store/actions';
import FormAdd from './../components/FormAdd';
import List from './../components/List';
import Navbar from './../components/Navbar';

@connect((store) => {
    const {list, filter} = store.todos;
    return {list, filter};
})
class Home extends Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    render () {
        const { list, dispatch, filter } = this.props;
        const countNotDone = list.filter(v => !v.done).length;
        return (
            <div>
                <FormAdd {...bindActionCreators(Actions, dispatch)} />
                <List list={filter == null ? list : list.filter(v => v.done === filter)} {...bindActionCreators(Actions, dispatch)} />
                {!!list.length && <Navbar
                    count={countNotDone}
                    showButton={list.length - countNotDone}
                    {...bindActionCreators(Actions, dispatch)} />}
            </div>
        );
    }
}

export default Home;
