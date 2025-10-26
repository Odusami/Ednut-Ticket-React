import React, { useState } from 'react'
import { useTicket } from '../contexts/TicketContext'
import Modal from './Modal'
import TicketForm from './TicketForm'

function TicketManagement() {
  const [showModal, setShowModal] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const { tickets, deleteTicket } = useTicket()

  const handleCreateTicket = () => {
    setEditingTicket(null)
    setShowModal(true)
  }

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket)
    setShowModal(true)
  }

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      await deleteTicket(ticketId)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTicket(null)
  }

  const handleFormSuccess = () => {
    setShowModal(false)
    setEditingTicket(null)
  }

  return (
    <div className="ticket-management" data-testid="ticket-management">
      <div className="container">
        <div className="page-header">
          <div className="page-header__content">
            <h1 className="page-title" data-testid="ticket-management-title">
              Ticket Management
            </h1>
            <p className="page-subtitle">
              Manage and track all support tickets in one place
            </p>
          </div>
          <button
            onClick={handleCreateTicket}
            className="btn btn--primary pad-btn"
            data-testid="create-ticket-btn"
          >
            Create New Ticket
          </button>
        </div>

        <div className="ticket-stats" data-testid="ticket-stats">
          <div className="stat-item">
            <span className="stat-number" data-testid="total-tickets">{tickets.length}</span>
            <span className="stat-label">Total Tickets</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-testid="open-tickets">
              {tickets.filter(t => t.status === 'open').length}
            </span>
            <span className="stat-label">Open</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-testid="in-progress-tickets">
              {tickets.filter(t => t.status === 'in_progress').length}
            </span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-testid="closed-tickets">
              {tickets.filter(t => t.status === 'closed').length}
            </span>
            <span className="stat-label">Closed</span>
          </div>
        </div>

        {tickets.length === 0 ? (
          <div className="empty-state empty-t-ticket" data-testid="no-tickets-state">
            <div className="empty-state__icon">🎫</div>
            <h3>No tickets yet</h3>
            <p>Create your first ticket to get started with ticket management.</p>
            <button
              onClick={handleCreateTicket}
              className="btn btn--primary margin-t pad-btn"
            >
              Create Your First Ticket
            </button>
          </div>
        ) : (
          <div className="tickets-grid" data-testid="tickets-grid">
            {tickets.map(ticket => (
              <div key={ticket.id} className="ticket-card" data-testid={`ticket-card-${ticket.id}`}>
                <div className="ticket-card__header">
                  <h3 className="ticket-card__title" data-testid="ticket-card-title">
                    {ticket.title}
                  </h3>
                  <div className="ticket-card__badges">
                    <span 
                      className={`status-badge status-badge--${ticket.status}`}
                      data-testid="ticket-card-status"
                    >
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span 
                      className={`priority-badge priority-badge--${ticket.priority}`}
                      data-testid="ticket-card-priority"
                    >
                      {ticket.priority}
                    </span>
                  </div>
                </div>

                <p className="ticket-card__description" data-testid="ticket-card-description">
                  {ticket.description || 'No description provided'}
                </p>

                <div className="ticket-card__meta">
                  <span data-testid="ticket-card-created">
                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                  {ticket.updatedAt !== ticket.createdAt && (
                    <span data-testid="ticket-card-updated">
                      Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="ticket-card__actions">
                  <button
                    onClick={() => handleEditTicket(ticket)}
                    className="btn btn--secondary btn--small"
                    data-testid={`edit-ticket-${ticket.id}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="btn btn--danger btn--small"
                    data-testid={`delete-ticket-${ticket.id}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
        >
          <TicketForm
            ticket={editingTicket}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
    </div>
  )
}

export default TicketManagement