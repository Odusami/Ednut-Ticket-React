import React from 'react'
import { Link } from 'react-router-dom'
import { useTicket } from '../contexts/TicketContext'

function Dashboard() {
  const { tickets } = useTicket()
  
  const stats = {
    total: tickets.length,
    open: tickets.filter(ticket => ticket.status === 'open').length,
    inProgress: tickets.filter(ticket => ticket.status === 'in_progress').length,
    closed: tickets.filter(ticket => ticket.status === 'closed').length
  }

  return (
    <div className="dashboard" data-testid="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="page-title" data-testid="dashboard-title">Dashboard</h1>
          <p className="page-subtitle">Welcome to your ticket management dashboard</p>
        </div>

        <div className="stats-grid" data-testid="stats-grid">
          <div className="stat-card" data-testid="stat-total">
            <div className="stat-card__content">
              <h3 className="stat-card__value">{stats.total}</h3>
              <p className="stat-card__label">Total Tickets</p>
            </div>
            <div className="stat-card__icon">📋</div>
          </div>

          <div className="stat-card" data-testid="stat-open">
            <div className="stat-card__content">
              <h3 className="stat-card__value">{stats.open}</h3>
              <p className="stat-card__label">Open Tickets</p>
            </div>
            <div className="stat-card__icon-size stat-card__icon-open"></div>
          </div>

          <div className="stat-card" data-testid="stat-in-progress">
            <div className="stat-card__content">
              <h3 className="stat-card__value">{stats.inProgress}</h3>
              <p className="stat-card__label">In Progress</p>
            </div>
            <div className="stat-card__icon-size stat-card__icon-progress"></div>
          </div>

          <div className="stat-card" data-testid="stat-closed">
            <div className="stat-card__content">
              <h3 className="stat-card__value">{stats.closed}</h3>
              <p className="stat-card__label">Closed Tickets</p>
            </div>
            <div className="stat-card__icon-size stat-card__icon-close"></div>
          </div>
        </div>

        <div className="quick-actions" data-testid="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/tickets" className="action-card" data-testid="action-manage-tickets">
              <div className="action-card__icon">🎫</div>
              <h3>Manage Tickets</h3>
              <p>View, create, and manage all tickets</p>
            </Link>
            
            <Link to="/tickets?create=new" className="action-card" data-testid="action-create-ticket">
              <div className="action-card__icon">➕</div>
              <h3>Create New Ticket</h3>
              <p>Create a new support ticket</p>
            </Link>
          </div>
        </div>

        <div className="recent-tickets" data-testid="recent-tickets">
          <div className="section-header">
            <h2 className="section-title">Recent Tickets</h2>
            <Link to="/tickets" className="btn btn--secondary" data-testid="view-all-tickets">
              View All
            </Link>
          </div>
          
          {tickets.length === 0 ? (
            <div className="empty-state empty-d-ticket" data-testid="no-tickets-message">
              <p>No tickets yet. Create your first ticket to get started!</p>
              <Link to="/tickets" className="btn btn--primary margin-t">
                Create Ticket
              </Link>
            </div>
          ) : (
            <div className="tickets-list">
              {tickets.slice(0, 5).map(ticket => (
                <div key={ticket.id} className="ticket-card" data-testid={`ticket-${ticket.id}`}>
                  <div className="ticket-card__header">
                    <h3 className="ticket-card__title" data-testid="ticket-title">{ticket.title}</h3>
                    <span 
                      className={`status-badge status-badge--${ticket.status}`}
                      data-testid="ticket-status"
                    >
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="ticket-card__description" data-testid="ticket-description">
                    {ticket.description || 'No description provided'}
                  </p>
                  <div className="ticket-card__meta">
                    <span data-testid="ticket-priority">Priority: {ticket.priority}</span>
                    <span data-testid="ticket-created">
                      Created: {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard