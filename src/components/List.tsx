import { Link } from 'react-router-dom';
import styled from "styled-components";

const StyledDiv = styled.div`
    align-items: baseline;
    background-color: var(--background--list);
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    margin: 1rem auto;
    width: 35%;
`

const StyledList = styled.li`
    color: var(--text-color-landPage);
    list-style-type: none;
`

const StyledButtonDelete = styled.button `
    background-color: var(--background--btn-delete);
    border: none;
    color: var(--text-color-landPage);
    padding: .5rem;
`

interface ListProps {
    list: TodoList,
    reloadList: () => void
}

const List = ({ list, reloadList }: ListProps) => {

    const deleteList = async () => {
        await fetch(`http://localhost:3001/v1/todolists/${list.id}`, {
            method: 'DELETE'
        });
        reloadList();
    };

    return (
        <StyledDiv>
            <Link to={`todos/${list.id}`} state={{ title: list.name }}>
                <StyledList>{list.name}</StyledList>
            </Link>
            <StyledButtonDelete onClick={() => deleteList()}>Delete list</StyledButtonDelete>
        </StyledDiv>
    )
};

export default List;