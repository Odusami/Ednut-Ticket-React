import { useAuth } from '../contexts/AuthContext'

function Toast() {
  const { toast } = useAuth()

  if (!toast) return null

  return (
    <div 
      className={`toast toast--${toast.type}`}
      data-testid={`toast-${toast.type}`}
    >
      <div className="toast__content">
        <span data-testid="toast-message">{toast.message}</span>
      </div>
    </div>
  )
}

export default Toast