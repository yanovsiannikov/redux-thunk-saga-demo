import React from 'react';
import {addTodo} from '../actions/actions';
import { connect } from "react-redux";

const AddTodo = props => {
    let input
    const addTask = async (input) => {
        props.addTodoMethod(input);
        let res = await fetch('/add', {
            method : 'Post',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({"text" : input})})
        alert(await res.text())
    }

return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                addTask(input.value);
                input.value = ''
            }}>
                <input ref={node => input = node} />
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    addTodoMethod: (content) => dispatch(addTodo(content))
  }
}

export default connect(
    null,
    mapDispatchToProps
)(AddTodo)
