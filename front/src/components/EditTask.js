import React from 'react';
import {updTodo} from '../actions/actions';
import { connect } from "react-redux";

const EditTodo = props => {
    let input
    return (
        <div>
            <input ref = {node => input = node} placeholder="Edit..."/>
            <button onClick={() => props.updTodoMethod(input.value, props.id)}>Save</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    updTodoMethod: (content, id) => dispatch(updTodo(content, id))
  }
}

export default connect(
    null,
    mapDispatchToProps
)(EditTodo)
