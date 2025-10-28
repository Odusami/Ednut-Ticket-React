

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" data-testid="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 data-testid="modal-title">{title}</h2>
          <button
            onClick={onClose}
            className="modal-close"
            data-testid="modal-close"
          >
             ✕
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal