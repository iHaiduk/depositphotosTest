/**
 * Created by igor on 19.02.17.
 */


export default (state = {list: []}, action) => {
    switch (action.type) {
        case 'ADD_FULFILLED': {
            const {data} = action.payload;
            const list = [...state.list, data];
            return {...state, list};
        }
        case 'ACTIVE_FULFILLED' : {
            const {_id, done} = action.payload.data;
            const list = [...state.list];
            const index = list.findIndex(v => v._id === _id);
            list[index].done = done;
            return {...state, list};
        }
        case 'UPDATE_FULFILLED': {
            const {_id, text} = action.payload.data;
            const list = [...state.list];
            const index = list.findIndex(v => v._id === _id);
            list[index].text = text;
            return {...state, list};
        }
        case 'DELETE_FULFILLED': {
            const {index} = action.payload.data;
            const list = [...state.list];
            list.splice(index, 1);
            return {...state, list};
        }
        case 'CLEAR_FULFILLED': {
            const list = [...state.list].filter(v => !v.done);
            return {...state, list};
        }
        case 'FILTER': {
            const filter = action.filter;
            return {...state, filter};
        }
        default:
            return state;
    }
};
