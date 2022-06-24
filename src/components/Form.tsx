import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledH2 = styled.h2 `
    border: 3px solid var(--background--form);
    color: var(--text-color);
    display: inline;
    font-size: 20px;
    padding: .25rem .5rem .25rem .5rem;
`
const StyledForm = styled.form `
    background-color: var(--background--form);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0.5rem;
`

const StyledInput = styled.input `
    margin-bottom: 1rem;
    padding: 0.5rem;
`
const StyledButtonAdd = styled.button `
    align-self: flex-end;
    background-color: var(--background--btn--add-todo);
    border: none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0.3rem;
    width: 15%;
`

interface TodosProps {
    reloadTodos: () => void
}

const Form = ({ reloadTodos }: TodosProps) => {

    const params = useParams();
  
    const [todoName, setTodoName] = useState('');
    const [todoDescription, setTodoDescription] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === 'todoName') {
            setTodoName(event.target.value)
        }else {
            setTodoDescription(event.target.value)
        }
    };

    const createNewTodo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await fetch(`https://todo-list-db-service.herokuapp.com/v1/todolists/${params.id}/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                todoListId: params.id,
                name: todoName,
                description: todoDescription,
                isDone: false
            })
        })
            .then(res => res.json());
            setTodoName('');
            setTodoDescription('');
            reloadTodos();
    }

    return (
        <>
            <StyledH2>Register To Do</StyledH2>
            <StyledForm onSubmit={(event) => createNewTodo(event)}>
                <StyledInput type="text" id="todoName" value={todoName} name="todoName" placeholder="Title" onChange={handleChange} />
                <StyledInput type="text" id="todoDescription" value={todoDescription} name="todoDescription" placeholder="Description" onChange={handleChange} />
                <StyledButtonAdd type="submit">Add todo</StyledButtonAdd>
            </StyledForm>
        </>
    )
};

export default Form; 