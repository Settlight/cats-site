import React, { useState, useEffect } from 'react';
import './App.css';
import BreedList from './components/BreedList';
import BreedDetails from './components/BreedDetails';
import LoginForm from './components/LoginForm';

function App() {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState(null);

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/breeds')
            .then(response => response.json())
            .then(data => setBreeds(data))
            .catch(err => console.error('Помилка завантаження:', err));
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Cat Breeds</h1>
            <LoginForm />
            <BreedList breeds={breeds} onSelect={setSelectedBreed} />
            {selectedBreed && <BreedDetails breed={selectedBreed} />}
        </div>
    );
}

export default App;

