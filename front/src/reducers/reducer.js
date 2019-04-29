import {ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_TODO, MONGO_TASKS, MONGO_START, MONGO_ERROR} from '../actions/actionTypes';

const initialState = {
    todos: [],
    loading: false,
    error : false
};

export default (state = initialState, action) => {
   switch (action.type) {
       case MONGO_ERROR :
           return {...state, loading : false, error : true}
       case MONGO_START :
           return {...state, loading : true}
       case MONGO_TASKS :
           return {...state, todos : action.content, loading : false}
        case ADD_TODO : 
            return { ...state, todos : [...state.todos, {title: action.text, completed: false }]};
        case DELETE_TODO :
            return { ...state, todos : [...state.todos.filter((e, i) => i !== action.id)]};
        case COMPLETE_TODO :
            return {...state, todos : [...state.todos.map((el, i) => 
                i === action.id ? {...el, completed : !el.completed} : el)]};
        case UPDATE_TODO :
        return {...state,  todos : [...state.todos.map((el, i) => 
                i === action.id ? {...el, title : action.text} : el)]};
        default : return state;
    }
}
