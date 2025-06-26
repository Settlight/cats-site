import React, { useState, useEffect } from 'react';
import './App.css';
import BreedList     from './components/BreedList';
import BreedDetails  from './components/BreedDetails';
import LoginForm     from './components/LoginForm';
import Quiz          from './components/quiz';

function App() {
    const [breeds, setBreeds]           = useState([]);
    const [selectedBreed, setSelected]  = useState(null);

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/breeds')
            .then(r => r.json())
            .then(setBreeds)
            .catch(err => console.error('Помилка завантаження:', err));
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Cat Breeds</h1>

            <LoginForm />


            <BreedList breeds={breeds} onSelect={setSelected} />

            {selectedBreed && <BreedDetails breed={selectedBreed} />}

            {breeds.length > 0 && <Quiz breeds={breeds} />}
        </div>
    );
}

export default App;


