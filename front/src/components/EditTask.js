import React from 'react';
import {updTodo} from '../actions/actions';
import { connect } from "react-redux";

const EditTodo = props => {

    const mongoEdit = async (input, id, index) => {
        props.updTodoMethod(input, index)
        let res = await fetch('/edit/'+id, {
            method : 'PUT',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({"text" : input})})
        alert(await res.text())
    }

    let input
    return (
        <div>
            <input ref = {node => input = node} placeholder="Edit..."/>
            <button onClick={() => mongoEdit(input.value, props.id, props.index)}>Save</button>
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
