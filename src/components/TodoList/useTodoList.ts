import { useState, useEffect } from "react"

export interface Todo {
    id: string;
    content: string;
    completed: boolean;
}

export type TabState = "모두" | "진행" | "완료";

const useTodoList = (id: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);
    // {
    //     id: "1",
    //     content: "JavaScript 공부",
    //     completed: false,
    // },
    // {
    //     id: "2",
    //     content: "React 공부",
    //     completed: true,
    // },
    // {
    //     id: "3",
    //     content: "Spooring Boot 공부",
    //     completed: false,
    // }
    // ]);
    const [currentTab, setCurrentTab] = useState<TabState>("모두");

    useEffect(() => {
        const savedData = localStorage.getItem(`todo-list-${id}`);
        if (savedData) {
            const { todos, currentTab } = JSON.parse(savedData);
            setTodos(todos);
            setCurrentTab(currentTab);
        }
    }, [id]);

    useEffect(() => {
        localStorage.setItem(
            `todo-list-${id}`,
            JSON.stringify({ todos, currentTab })
        );

    }, [todos, currentTab, id]);
    
    const filteredTodos = todos.filter((todo) => {
        if (currentTab == "모두") {
            return true;
        } else if (currentTab == "진행") {
            return !todo.completed;
        } else if (currentTab == "완료") {
            return todo.completed;
        }
    })

    const remainTodosAmount = todos.filter((todo) => !todo.completed).length;

    const completedTodoExists = todos.some((todo) => todo.completed);

    const addTodo = (content: string) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            content,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const editTodo = (id: string, content: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id == id ? {...todo, content} : todo))
        );     
    };

    const deleteTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id != id));
    };

    const deleteCompletedTodo = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    };

    const toggleTodo = (id: string) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) =>
                todo.id == id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const toggleTodoAll = () => {
        const areAllCompleted = todos.every((todo) => todo.completed);
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({...todo, compelted: !areAllCompleted}))
        );
    };

    return {
        state: {
            todos,
            currentTab,
            filteredTodos,
            remainTodosAmount,
            completedTodoExists,
        },

        action: {
            addTodo,
            editTodo,
            deleteTodo,
            deleteCompletedTodo,
            toggleTodo,
            toggleTodoAll,
            setCurrentTab,
        }
    };
};

export default useTodoList;