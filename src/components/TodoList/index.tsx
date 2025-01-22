import Header from "./header";
import TodoItem from "./TodoItem";
import Footer from "./footer";
import useTodoList from "./useTodoList";

interface TodoListProps {
    id: string;
}

const TodoList = ({id}: TodoListProps) => {
    const {
        state: {
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
        },
    } = useTodoList(id);

    return (
        <div className="w-[600px] max-h-[calc(100vh-200px)] flex flex-col bg-whilte rounded-lg drop-shadow-md">
            <Header addTodo={addTodo} toggleTodoAll={toggleTodoAll} />
            <div className="h-full overflow-y-auto">
            {filteredTodos.map((todo) => (
                <TodoItem 
                    todo={todo} 
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
            </div>
            <Footer 
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                completedTodoExists={completedTodoExists}
                remainTodosAmount={remainTodosAmount}
                deleteCompletedTodo={deleteCompletedTodo}
            />
        </div>
    );
}

export default TodoList;