import React, { useState, useEffect } from 'react';

export default function Poll({ breeds }) {
    const [choice, setChoice] = useState('');
    const [votes, setVotes]   = useState({});
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('votes') || '{}');
        setVotes(stored);
    }, []);
    const handleVote = e => {
        e.preventDefault();
        if (!choice) return;
        const newVotes = { ...votes, [choice]: (votes[choice] || 0) + 1 };
        setVotes(newVotes);
        localStorage.setItem('votes', JSON.stringify(newVotes));
        setChoice('');
    };

    return (
        <div className="card mt-5">
            <div className="card-body">
                <h5 className="card-title">Опитування: Яка ваша улюблена порода?</h5>

                <form onSubmit={handleVote} className="mb-3">
                    <select
                        className="form-select mb-2"
                        value={choice}
                        onChange={e => setChoice(e.target.value)}
                    >
                        <option value="">-- Оберіть породу --</option>
                        {breeds.map(b => (
                            <option key={b.id} value={b.name}>{b.name}</option>
                        ))}
                    </select>

                    <button type="submit" className="btn btn-primary">
                        Голосувати
                    </button>
                </form>


                {Object.keys(votes).length > 0 && (
                    <>
                        <h6>Результати:</h6>
                        <ul className="list-group">
                            {Object.entries(votes)
                                .sort((a, b) => b[1] - a[1])
                                .map(([name, count]) => (
                                    <li key={name}
                                        className="list-group-item d-flex justify-content-between">
                                        <span>{name}</span>
                                        <span className="badge bg-secondary">{count}</span>
                                    </li>
                                ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
