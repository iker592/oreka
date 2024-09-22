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

  function createTodo(content: string, date: string) {
    client.models.Todo.create({
      content: content,
    });
  }
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  const handleEmojiFeedback = (level: number, comment: string) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const content = `Mood: ${level}, Comment: ${comment}`;
    createTodo(content, currentDate);
  };

  return (
    <Layout>
      <Authenticator>
        {({ signOut, user }) => (
          <CenteredContent>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Daily Checkup</h1>
            <EmojiFeedback onSave={handleEmojiFeedback} />
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Previous entries</h2>
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