import React from 'react';

const BreedDetails = ({ cat, catImage }) => {
    if (!cat) return null;

    return (
        <div className="modal fade" id="catModal" tabIndex="-1" aria-labelledby="catModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h5 className="modal-title" id="catModalLabel">{cat.name}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {catImage && (
                            <img
                                src={catImage}
                                alt={cat.name}
                                className="img-fluid rounded mb-3"
                            />
                        )}
                        <p><strong>Опис:</strong> {cat.description}</p>
                        <p><strong>Темперамент:</strong> {cat.temperament}</p>
                        <p><strong>Походження:</strong> {cat.origin}</p>
                        <p><strong>Життєвий цикл:</strong> {cat.life_span} років</p>
                        {cat.wikipedia_url && (
                            <p>
                                <a href={cat.wikipedia_url} target="_blank" rel="noopener noreferrer" className="link-info">
                                    Wikipedia
                                </a>
                            </p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">Закрити</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreedDetails;

