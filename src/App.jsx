import React, { useState, useEffect } from 'react';
import './App.css';
import BreedList     from './components/BreedList';
import BreedDetails  from './components/BreedDetails';
import LoginForm     from './components/LoginForm';
import Quiz          from './components/quiz';

function App() {
    const [breeds, setBreeds]           = useState([]);
    const [selectedBreed, setSelected]  = useState(null);

    /* завантаження порід */
    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/breeds')
            .then(r => r.json())
            .then(setBreeds)
            .catch(err => console.error('Помилка завантаження:', err));
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Cat Breeds</h1>

            {/* форма логіну */}
            <LoginForm />

            {/* список порід */}
            <BreedList breeds={breeds} onSelect={setSelected} />

            {/* деталі обраної породи */}
            {selectedBreed && <BreedDetails breed={selectedBreed} />}

            {/* опитування зʼявиться, коли дані вже завантажені */}
            {breeds.length > 0 && <Quiz breeds={breeds} />}
        </div>
    );
}

export default App;


