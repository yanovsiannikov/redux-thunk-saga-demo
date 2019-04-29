import React from 'react';
import { delTodo, compTodo, mongoTodo, mongoSt, mongoEr } from '../actions/actions'
import { connect } from "react-redux";
import EditTodo from "../components/EditTask";

const mapStateToProps = (state, ownProps) => ({
    tasks: state.todos,
    loading: state.loading,
    error: state.error
})

class List extends React.Component {
    //Redux-thunk starts here
    getTasks = () => async dispatch => {
        dispatch(mongoSt());
        try {
            let data = await fetch('/getall')
            let res = await data.json()
            dispatch(mongoTodo(res))
        }
        catch (err) {
            dispatch(mongoEr())
        }

}

    removeMongo = async (index, id) => {
        this.props.delTodoMethod(index)
        await fetch('/delete/'+id, {
            method : 'DELETE'})
    }

    completeMongo = async (index, id) => {
        this.props.compTodoMethod(index)
        await fetch('/complete/'+id, {
            method : 'PUT'})
    }


    async componentWillMount() {
        this.props.dispatch(this.getTasks())
    }
    render () {return (
            <div>
                <ol>
                    {this.props.loading ? 'LOADING...' : this.props.error ? 'Something went wrong.Unable to load Data' :
                    this.props.tasks.map((task, index) =>
                        <li key={task._id}>
                            {task.title}{task.completed && ' ##COMPLETED'}
                            <div>
                                <button onClick={() => this.removeMongo(index,task._id)}>Delete</button>
                                <button onClick={() => this.completeMongo(index,task._id)}>Complete</button>
                                <EditTodo index={index} id={task._id}/>
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
