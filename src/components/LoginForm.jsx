import React, { useState } from 'react';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!username || !password) {
            setError('Будь ласка, заповніть усі поля.');
            return;
        }

        if (/[^a-zA-Z0-9]/.test(username)) {
            setError('Імʼя користувача містить заборонені символи.');
            return;
        }

        setError('');
        alert(`Вітаємо, ${username}!`);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Імʼя користувача"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-success">Увійти</button>
        </form>
    );
}
