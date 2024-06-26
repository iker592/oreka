import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Sup in your life bro?"),
    });
  }

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Reasons for Oreka to be the best sports app out there 🥳 </h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li
              onClick={() => deleteTodo(todo.id)} 
              key={todo.id}>{todo.content}
              </li>
            ))}
          </ul>
          <div>
            Shoot us a msg at: @oreka-sports, let's get iit!
            <br />
          </div>
        </main>
    )}
    </Authenticator>
  );
}
