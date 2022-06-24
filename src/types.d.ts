interface TodoList {
    id: bigint
    name: string
}

interface Todo {
    id: bigint
    todoListId: bigint
    name: string
    description: string
    isDone: boolean
}