import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import EmojiFeedback from '../components/EmojiFeedback' 
import Layout from '../components/Layout';

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
          <main className="min-h-screen bg-white p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-5 mt-5">
              <h1 className="text-3xl font-bold mb-6 text-center">Oreka</h1>
              <EmojiFeedback />
              <div className="mt-6 text-center text-gray-600">
                @oreka-sports
              </div>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold mb-6 text-center">Add Comments below</h1>
              <button 
                onClick={createTodo}
                className="w-full bg-black text-white py-2 rounded-lg mb-4 hover:bg-gray-800 transition-colors"
              >
                + new
              </button>
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    onClick={() => deleteTodo(todo.id)} 
                    key={todo.id}
                    className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    {todo.content}
                  </li>
                ))}
              </ul>
            </div>
          </main>
        )}
      </Authenticator>
    </Layout>
  );
}