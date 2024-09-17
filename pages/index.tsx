import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import EmojiFeedback from '../components/EmojiFeedback' 
import Layout from '../components/Layout';
import CenteredContent from '../components/CenteredContent';

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
      content: window.prompt("What's up in your life?"),
    });
  }
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <Layout>
      <Authenticator>
        {({ signOut, user }) => (
          <CenteredContent>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Oreka</h1>
            <EmojiFeedback />
            <div className="mt-6 text-center text-gray-300">
              @oreka-sports
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Daily Check-in</h2>
              <button 
                onClick={createTodo}
                className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 hover:bg-blue-700 transition-colors"
              >
                + Add new entry
              </button>
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    onClick={() => deleteTodo(todo.id)} 
                    key={todo.id}
                    className="bg-gray-700 p-2 rounded cursor-pointer hover:bg-gray-600 transition-colors text-gray-100"
                  >
                    {todo.content}
                  </li>
                ))}
              </ul>
            </div>
          </CenteredContent>
        )}
      </Authenticator>
    </Layout>
  );
}