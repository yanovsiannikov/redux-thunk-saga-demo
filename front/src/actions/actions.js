import { ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_TODO,
    MONGO_TASKS, MONGO_ERROR, MONGO_START, MONGO_SAGA} from './actionTypes'
import {put, call, takeEvery} from 'redux-saga/effects'

export const addTodo = text => ({ type: ADD_TODO, text: text });
export const delTodo = id => ({ type: DELETE_TODO, id: id });
export const compTodo = id => ({ type: COMPLETE_TODO, id: id });
export const updTodo = (text, id) => ({ type: UPDATE_TODO, text: text, id: id });

export const mongoTodo = content => ({ type: MONGO_TASKS, content});
export const mongoSt = content => ({ type: MONGO_START});
export const mongoEr = content => ({ type: MONGO_ERROR});

export const getTasksSaga = () => ({type : MONGO_SAGA})


//*********Redux-saga starts here
export function* watchTasks() {
    yield takeEvery(MONGO_SAGA, mongoSaga)
}

export function *mongoSaga() {
    try {
        yield put(mongoSt());
        const data = yield call(() => fetch('/getall'));
        const res = yield call(() => data.json());
        yield put(mongoTodo(res));
    } catch (error) {
        yield put(mongoEr());
    }
}
//***********


