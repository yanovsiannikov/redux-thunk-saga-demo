import React from 'react';
import { delTodo, compTodo, mongoTodo, mongoSt, mongoEr } from '../actions/actions'
import { connect } from "react-redux";
import EditTodo from "../components/EditTask";
import {getTasksSaga} from "../actions/actions"

const mapStateToProps = (state, ownProps) => ({
    tasks: state.todos,
    loading: state.loading,
    error: state.error
})

class List extends React.Component {
//Thunk
//     getTasks = () => {
//         return async (dispatch) => {
//         dispatch(mongoSt());
//         try {
//             let data = await fetch('/getall')
//             let res = await data.json()
//             dispatch(mongoTodo(res))
//         }
//         catch {
//             dispatch(mongoEr())
//         }}
//
// }
    async componentWillMount() {

        // this.props.dispatch(this.getTasks()) //Redux-thunk

        this.props.dispatch(getTasksSaga()) //Redux-Saga

    }
    render () {return (
            <div>
                <ol>
                    {this.props.loading && 'LOADING...'}
                    {this.props.error && 'Something went wrong...'}
                    {this.props.tasks.map((task, index) =>
                        <li key={task._id}>
                            {task.title}{task.completed && '+'}
                            <div>
                                <button onClick={() => this.props.delTodoMethod(index)}>Delete</button>
                                <button onClick={() => this.props.compTodoMethod(index)}>Complete</button>
                                <EditTodo id={index} />
                            </div>
                        </li>
                    )}
                </ol>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        delTodoMethod: (content) => dispatch(delTodo(content)),
        compTodoMethod: (content) => dispatch(compTodo(content)),
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(List)
