import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Form from "./Form";
import styled from "styled-components";

interface StyledTodoProps {
    readonly isDone: boolean;
}

const StyledDivContainer = styled.div`
    margin: 1.5rem auto;
    width: 40%;
`

const StyledTitle = styled.h1`
    color: var(--text-color);
    font-size: 26px;
    margin-bottom: 1rem;
`

const StyledFilter = styled.div`
    color: var(--text-color);
    display: flex;
    font-size: 20px;
    margin: 1rem;
`
const StyledParagraph = styled.p`
    margin-right: 0.5rem;
`

const StyledTodo = styled.li<StyledTodoProps> `
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem 0rem;
    padding: 1rem;
    list-style-type: none;

    ${({ isDone }) => isDone ? `background-color: #89a7b1;` : `background-color: #e6a37a`}
`
const StyledDiv = styled.div<StyledTodoProps> `
    ${({ isDone }) => isDone ? `text-decoration: line-through` : ``}
`

const StyledDescription = styled.p`
    margin-top: .8rem;
`

const StyledBtnDelete = styled.button`
    background-color: var(--background--btn-delete);
    border: none;
    color: var(--text-color-landPage);
    height: 36px;
    padding: 10px;
`

interface NavigateState {
    title: string
}

const TodosPage = () => {

    const params = useParams();
    const location = useLocation();

    let { title } = location.state as NavigateState;

    const [todos, setTodos] = useState<Todo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    const [isDoneChecked, setIsDoneChecked] = useState(false);

    const reloadTodos = async () => {
        return await fetch(`http://localhost:3001/v1/todolists/${params.id}/todo`)
            .then(res => res.json())
            .then(data => {
                setTodos(data)
                if (isDoneChecked) {
                    //@ts-ignoretsignore 
                    const newFilteredTodos = data.filter((todo) => todo.isDone)
                    setFilteredTodos(newFilteredTodos)
                } else {
                    setFilteredTodos(data)
                }
            })
    };

    useEffect(() => {
        reloadTodos()
    }, [params.id]);

    const handleCheckbox = () => {
        setIsDoneChecked(!isDoneChecked)
        if (!isDoneChecked) {
            const newFilteredTodos = todos.filter(todo => todo.isDone)
            setFilteredTodos(newFilteredTodos)
        } else {
            setFilteredTodos(todos)
        }
    };

    const handleUpdate = async (id: BigInt) => {
        await fetch(`http://localhost:3001/v1/todos/${id}`, {
            method: 'PUT',
            headers: { 'Contenundefinedt-Type': 'application/json' },
        });
        reloadTodos();
    };

    const deleteTodo = async (id: BigInt) => {
        await fetch(`http://localhost:3001/v1/todos/${id}`, {
            method: 'DELETE',
        });
        reloadTodos();
    };

    return (
        <StyledDivContainer>
            <StyledTitle>{title}</StyledTitle>
            <Form reloadTodos={reloadTodos} />
            <StyledFilter>
                <StyledParagraph>Filter by:</StyledParagraph>
                <label htmlFor="input_checkbox--isDone"><input type="checkbox" id="input_checkbox--isDone" name='checkboxIsDone' onChange={handleCheckbox} />Is done!</label>
            </StyledFilter>
            <ul>
                {filteredTodos.map((item, key) => {
                    return (
                        <StyledTodo isDone={item.isDone} key={key} onClick={() => handleUpdate(item.id)}>
                            <StyledDiv isDone={item.isDone}>
                                <p>{item.name}</p>
                                <StyledDescription>{item.description}</StyledDescription>
                            </StyledDiv>
                            {item.isDone ? <StyledBtnDelete onClick={() => deleteTodo(item.id)}>Delete Todo</StyledBtnDelete> : ''}
                        </StyledTodo>
                    )
                })}
            </ul>
        </StyledDivContainer>
    )
}

export default TodosPage;