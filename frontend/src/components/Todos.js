import React, {useState} from 'react'
import {Card, ListGroup, CardDeck} from 'react-bootstrap'
import { Form, FormGroup, Button } from 'react-bootstrap'

//map through users todos and display them as list items
function Todos({todos, setTodos}) {

    const [newItem, setNewItem] = useState('');

    const displayTodos = () => {
        return todos.map(todo => {
            //<ListGroup.Item>Item: {todo.text}</ListGroup.Item>
            return <li>Item: {todo.text}</li>
            //console.log('THE MF TODO', todo.text)
        })
    }

    const grabNewTodo = (e) => {
        let text = e.target.value;
        //everytime a new item is input it gets a text and a done status defaulted to false
        setNewItem({text, done: false})
        //setTodos(todoItems)
    }

    const addItem = (e) => {
        e.preventDefault();
        console.log('new item', newItem)
        setTodos([...todos, newItem])
        console.log('todos', todos)
        //set the newItem back to empty
        setNewItem('')
        //setTodos([])
    }


    return (
        <div>
            {/* <Card> */}
            <div>
                {/* <ListGroup> */}
                <ul>Your Todos:
                    {displayTodos()}
                </ul>
                {/* </ListGroup> */}
            </div>
            {/* </Card> */}

            <Form>
                <FormGroup>
                    <Form.Control
                    size ="sm"
                    type="text"
                    placeholder="Add todo" 
                    name="todoItem"
                    value={newItem.text}
                    onChange={grabNewTodo} />
                    <Button onClick={(e)=> addItem(e)}>Add Todo</Button>
                </FormGroup>
            </Form>
            
        </div>
    )
}

export default Todos
