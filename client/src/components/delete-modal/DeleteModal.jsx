import './DeleteModal.css';

export default function DeleteModal({ show, handleClose, handleDelete, commentId }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Потвърдете</h2>
                <p>Наистина ли исткате да изтриете този коментар?</p>
                <div className="modal-actions">
                    <button onClick={handleClose} className="modal-button cancel-button">Отказ</button>
                    <button onClick={() => handleDelete(commentId)} className="modal-button delete-button">Изтрий</button>
                </div>
            </div>
        </div>
    );
};