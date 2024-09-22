import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.css';
import { IoMdDoneAll } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

function Todo() {
    const [todo, settodo] = useState('');
    const [todos, settodos] = useState([]);
    const [editId, setEditId] = useState(0);

    const handlesubmit = (e) => {
        e.preventDefault();
    };

    const addTodo = () => {
        if (todo) {
            settodos([...todos, { list: todo, id: Date.now(), status: false }]);
            settodo('');
        }
        if (editId) {
            const editTodo = todos.find((todo) => todo.id === editId);
            const updateTodo = todos.map((to) =>
                to.id === editTodo.id ? { id: to.id, list: todo } : { id: to.id, list: to.list }
            );
            settodos(updateTodo);
            setEditId(0);
            settodo('');
        }
    };

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onDelete = (id) => {
        settodos(todos.filter((to) => to.id !== id));
    };

    const onComplete = (id) => {
        const complete = todos.map((list) => {
            if (list.id === id) {
                return { ...list, status: !list.status };
            }
            return list;
        });
        settodos(complete);
    };

    const onEdit = (id) => {
        const edittodo = todos.find((to) => to.id === id);
        settodo(edittodo.list);
        setEditId(edittodo.id);
    };

    return (
        <div className='container'>
            <h2>TODO APP</h2>
            <form className='form1' onSubmit={handlesubmit}>
                <input
                    type='text'
                    value={todo}
                    ref={inputRef}
                    placeholder='Enter your todo'
                    className='form-control'
                    onChange={(event) => settodo(event.target.value)}
                />
                <button type='button' onClick={addTodo}>
                    {editId ? 'EDIT' : 'ADD'}
                </button>
            </form>
            <div className='list'>
                <ul>
                    {todos.map((to) => (
                        <li className='list-items' key={to.id}>
                            <div className='list-item-list' id={to.status ? 'list-item' : ''}>
                                {to.list}
                            </div>
                            <span className='list-item-icons'>
                                <IoMdDoneAll id='complete' title='complete' onClick={() => onComplete(to.id)} />
                                <FiEdit id='edit' title='edit' onClick={() => onEdit(to.id)} />
                                <MdDelete id='delete' title='delete' onClick={() => onDelete(to.id)} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
