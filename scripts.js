import { useState, useEffect } from 'react';
import './App.css';

const CATEGORIES = [
  { id: 'work', label: 'Trabalho' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'nutrition', label: 'Alimentação' },
  { id: 'finance', label: 'Financeiro' },
  { id: 'appointments', label: 'Compromissos' },
  { id: 'misc', label: 'Diversos' }
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Baixa');
  const [activeTab, setActiveTab] = useState('work');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      priority,
      completed: false,
      category: activeTab
    };

    setTasks([...tasks, task]);
    setNewTask('');
    setPriority('Baixa');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return '#FF69B4';
      case 'Média': return '#FFB6C1';
      case 'Baixa': return '#FFC0CB';
      default: return '#FFC0CB';
    }
  };

  return (
    <div className="App" style={{
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'pattern\' x=\'0\' y=\'0\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M20 4C22.2 4 24 5.8 24 8C24 10.2 22.2 12 20 12C17.8 12 16 10.2 16 8C16 5.8 17.8 4 20 4ZM20 6C18.9 6 18 6.9 18 8C18 9.1 18.9 10 20 10C21.1 10 22 9.1 22 8C22 6.9 21.1 6 20 6Z\' fill=\'%23FFB6C1\' opacity=\'0.1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect x=\'0\' y=\'0\' width=\'100%\' height=\'100%\' fill=\'url(%23pattern)\' /%3E%3C/svg%3E"), linear-gradient(135deg, #FFE6F3 0%, #E6E6FA 100%)',
      backgroundBlendMode: 'overlay',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Quicksand", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px 40px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        position: 'relative'
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'auto',
          gap: '10px',
          marginBottom: '30px',
          padding: '5px 20px',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: '-ms-autohiding-scrollbar',
          scrollbarWidth: 'none',
          width: '100%'
        }}>
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              style={{
                padding: '10px 20px',
                backgroundColor: activeTab === category.id ? '#FF69B4' : '#FFF0F5',
                color: activeTab === category.id ? 'white' : '#333',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85em',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                transform: activeTab === category.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeTab === category.id ? '0 4px 12px rgba(255,105,180,0.3)' : '0 2px 6px rgba(255,105,180,0.15)'
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
        <h1 style={{
          color: '#FF69B4',
          marginBottom: '30px',
          fontSize: '2.8em',
          fontWeight: '700',
          textAlign: 'center',
          textTransform: 'none',
          letterSpacing: '2px',
          fontFamily: '"Dancing Script", cursive',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.8s ease-in-out'
        }}>Lista de Tarefas</h1>
        
        <form onSubmit={addTask} style={{ marginBottom: '30px' }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar nova tarefa"
            style={{
              padding: '15px',
              marginRight: '15px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              width: 'calc(100% - 280px)',
              fontSize: '1em',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              padding: '15px',
              marginRight: '15px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              fontSize: '1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <button
            type="submit"
            style={{
              padding: '15px 30px',
              backgroundColor: '#4A90E2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1em',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            Adicionar
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {tasks.filter(task => task.category === activeTab).map(task => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: task.completed ? 'rgba(241, 241, 241, 0.7)' : 'white',
                borderRadius: '10px',
                border: `2px solid ${getPriorityColor(task.priority)}`,
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                transform: task.completed ? 'scale(0.98)' : 'scale(1)'
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontSize: '1.1em',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#888' : '#333',
                  position: 'relative',
                  paddingLeft: task.completed ? '30px' : '0',
                  transition: 'all 0.3s ease',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.05)',
                  transform: task.completed ? 'scale(0.98)' : 'scale(1)',
                  opacity: task.completed ? '0.8' : '1'
                }}
              >
                {task.completed && (
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4CAF50',
                    fontSize: '1.2em'
                  }}>✓</span>
                )}
                {task.text}
              </span>
              <span
                style={{
                  padding: '6px 12px',
                  backgroundColor: getPriorityColor(task.priority),
                  borderRadius: '6px',
                  marginRight: '15px',
                  color: task.priority === 'Média' ? '#333' : 'white',
                  fontSize: '0.9em',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)'
                }}
              >
                {task.priority}
              </span>
              <button
                onClick={() => toggleTask(task.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: task.completed ? '#DDA0DD' : '#FF69B4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginRight: '10px',
                  transition: 'all 0.3s ease'
                }}
              >
                {task.completed ? 'Desfazer' : 'Concluir'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
