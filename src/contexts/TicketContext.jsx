import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const TicketContext = createContext()

export function useTicket() {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error('useTicket must be used within a TicketProvider')
  }
  return context
}

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([])
  const { showToast } = useAuth()

  useEffect(() => {
    const savedTickets = localStorage.getItem('ticketapp_tickets')
    if (savedTickets) {
      try {
        setTickets(JSON.parse(savedTickets))
      } catch (error) {
        console.error('Error loading tickets:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
  }, [tickets])

  const createTicket = async (ticketData) => {
    return new Promise((resolve, reject) => {
      try {
        if (!ticketData.title || !ticketData.status) {
          throw new Error('Title and status are required')
        }

        const validStatuses = ['open', 'in_progress', 'closed']
        if (!validStatuses.includes(ticketData.status)) {
          throw new Error('Invalid status value')
        }

        const newTicket = {
          id: Date.now().toString(),
          ...ticketData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        setTickets(prev => [newTicket, ...prev])
        showToast('Ticket created successfully!', 'success')
        resolve(newTicket)
      } catch (error) {
        showToast(error.message, 'error')
        reject(error)
      }
    })
  }

  const updateTicket = async (ticketId, updates) => {
    return new Promise((resolve, reject) => {
      try {
        if (updates.title !== undefined && !updates.title.trim()) {
          throw new Error('Title is required')
        }

        if (updates.status && !['open', 'in_progress', 'closed'].includes(updates.status)) {
          throw new Error('Invalid status value')
        }

        setTickets(prev => prev.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
            : ticket
        ))
        showToast('Ticket updated successfully!', 'success')
        resolve()
      } catch (error) {
        showToast(error.message, 'error')
        reject(error)
      }
    })
  }

  const deleteTicket = async (ticketId) => {
    return new Promise((resolve, reject) => {
      try {
        setTickets(prev => prev.filter(ticket => ticket.id !== ticketId))
        showToast('Ticket deleted successfully', 'success')
        resolve()
      } catch (error) {
        showToast('Failed to delete ticket', 'error')
        reject(error)
      }
    })
  }

  const value = {
    tickets,
    createTicket,
    updateTicket,
    deleteTicket
  }

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}