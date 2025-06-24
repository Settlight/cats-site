import React, { useEffect, useState } from 'react';
import BreedDetails from './BreedDetails';

const BreedList = () => {
    const [cats, setCats] = useState([]);
    const [selectedCat, setSelectedCat] = useState(null);
    const [catImage, setCatImage] = useState(null);

    useEffect(() => {
        const fetchCats = () => {
            fetch('https://api.thecatapi.com/v1/breeds')
                .then(res => res.json())
                .then(data => setCats(data));
        };

        fetchCats();
        const interval = setInterval(fetchCats, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleDetails = async (cat) => {
        setSelectedCat(cat);
        setCatImage(null);

        try {
            // Перший запит за breed id
            let res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}`);
            let data = await res.json();

            // Якщо фото немає — fallback-запит
            if (!data.length || !data[0].url) {
                res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1`);
                data = await res.json();
            }

            if (data[0]?.url) {
                setCatImage(data[0].url);
            }
        } catch (error) {
            console.error('Не вдалося завантажити зображення:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">🐱 Породи котів</h2>

            <div className="row">
                {cats.map(cat => (
                    <div key={cat.id} className="col-md-4 mb-4">
                        <div className="card bg-secondary text-light shadow-sm h-100">
                            {cat.image?.url && (
                                <img
                                    src={cat.image.url}
                                    className="card-img-top"
                                    alt={cat.name}
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{cat.name}</h5>
                                <p className="card-text small">{cat.origin}</p>
                                <button
                                    className="btn btn-light mt-auto"
                                    data-bs-toggle="modal"
                                    data-bs-target="#catModal"
                                    onClick={() => handleDetails(cat)}
                                >
                                    Дивитись деталі
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <BreedDetails cat={selectedCat} catImage={catImage} />
        </div>
    );
};

export default BreedList;

