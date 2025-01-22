import { useState } from 'react'
import TodoList from "./components/TodoList"

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

const TODO_LISTS = ["1", "2"];

function App() {
  return (
    <div className="w-screen h-screen flex-col gap-4 flex items-center bg-stone-100">
      <h1 className="font-serif font-light text-6xl mt-8 text-stone-400">
        해야할 공부
      </h1>
      {TODO_LISTS.map((id) => (
        <TodoList id={id}/>
      ))}
    </div>
  );
}

export default App;
