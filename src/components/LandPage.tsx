import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from './List';
import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 4rem auto 2rem auto;
    width: 25%;
`
const StyledInput = styled.input`
    border: none;   
    padding: .8em;
`
const StyledButton = styled.button`
    background-color: var(--background--btn);
    border: none;
    color: var(--text-color-landPage);
    font-size: 16px;
    margin-top: .5rem;
    padding: .8rem;
`

const LandPage = () => {

    const [data, setData] = useState<TodoList[]>([]);
    const [todoListName, setTodoListName] = useState('');

    const navigate = useNavigate();

    const reloadList = () => {
        fetch('https://todo-list-db-service.herokuapp.com/v1/todolists')
            .then(res => res.json())
            .then(data => setData(data))
    }

    useEffect(() => {
        reloadList();
    }, []);

    const createTodoList: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();

        await fetch('https://todo-list-db-service.herokuapp.com/v1/todolists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: todoListName
            })
        })
            .then(res => res.json())
            .then(r => navigate(`todos/${r.id}`, { state: { title: todoListName } }));
    }

    const hadleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTodoListName(event.target.value);
    };

    return (
        <div>
            <StyledForm>
                <StyledInput type="text" placeholder="To do list name" value={todoListName} onChange={hadleChange} />
                <StyledButton onClick={(event) => createTodoList(event)}>Create To do List</StyledButton>
            </StyledForm>
            <ul>
                {data.map((list, key) => <List key={key} list={list} reloadList={reloadList} />)}
            </ul>
        </div>
    )
};

export default LandPage;