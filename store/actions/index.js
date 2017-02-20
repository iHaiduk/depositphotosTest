/**
 * Created by igor on 19.02.17.
 */

import axios from 'axios';

export function addTodo (text) {
    return {
        type: 'ADD',
        payload: axios.put('/api/todo', { text })
    };
}

export function activeTodo (_id) {
    return {
        type: 'ACTIVE',
        payload: axios.post('/api/todo/' + _id)
    };
}

export function deleteTodo (_id) {
    return {
        type: 'DELETE',
        payload: axios.delete('/api/todo/' + _id)
    };
}

export function updateTodo (_id, text) {
    return {
        type: 'UPDATE',
        payload: axios.post('/api/todo/' + _id, {text})
    };
}

export function clearCompleted () {
    return {
        type: 'CLEAR',
        payload: axios.delete('/api/todo')
    };
}

export function filterUpdate (filter) {
    return {
        type: 'FILTER',
        filter
    };
}
