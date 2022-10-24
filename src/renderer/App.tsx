import path from 'path';
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const Hello = () => {
  const [ipc, setIpc] = useState<string>('');
  useEffect(() => {
    // calling IPC exposed from preload script
    window.electron.ipcRenderer.once('readFile', (arg) => {
      // eslint-disable-next-line no-console
      setIpc(String(arg));
    });
  }, []);

  return (
    <div>
      <h1>Nobellotteriet</h1>
      <input type="file" />
      <button
        onClick={() =>
          window.electron.ipcRenderer.sendMessage('readFile', ['./test.txt'])
        }
      >
        Kör
      </button>
      <p>{ipc}</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
