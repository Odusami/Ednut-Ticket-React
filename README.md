# TicketMaster - React Version

A robust ticket management web application built with React, featuring authentication, dashboard analytics, and full CRUD operations for ticket management.

## Live Demo

**[View Live Demo](https://odusami.github.io/Ednut-Ticket-React/)**

# Features

## Core Features

- Landing Page: Engaging hero section with wave background and decorative elements

- Authentication: Secure login/signup with form validation

- Dashboard: Overview with ticket statistics and quick actions

- Ticket Management: Complete CRUD operations (Create, Read, Update, Delete)

- Responsive Design: Optimized for mobile, tablet, and desktop

- Accessibility: WCAG compliant with proper ARIA labels and keyboard navigation

## Security & Validation

- Protected routes with session management

- Form validation with real-time error messages

- Status field validation (only accepts: "open", "in_progress", "closed")

- Input sanitization and error handling

## Design System

- Wave clip path background in hero section

- Decorative circular elements throughout

- Card-based layout with consistent shadows

- Max-width 1440px centered container

- Status-based color coding

- Fully responsive across all devices

# Installation & Setup

## Prerequisites

- Node.js (version 20)
- npm

## Installation Steps

- git clone https://github.com/Odusami/Ednut-Ticket-React.git
- cd Ednut-Ticket-React

## Install dependencies

- npm install
- nvm install
- nvm use

## Start development server

- npm run dev

# Authentication

The app uses simulated authentication with localStorage. No backend required.

## Test Credentials

You can use any email and password combination, but here are some examples:

- Email: demo@example.com

- Password: password

Or create a new account using the signup form.

# Layout

- Max Width: 1440px

- Responsive Breakpoints:

  - Mobile: 768px

  - Tablet: 1024px

  - Desktop: 1440px

# Testing

The application includes comprehensive data-testid attributes for all interactive elements to facilitate testing:

## Key Test IDs

- data-testid="auth-form" - Authentication form

- data-testid="create-ticket-btn" - Create ticket button

- data-testid="ticket-card-{id}" - Individual ticket cards

- data-testid="toast-success" - Success notifications

- data-testid="toast-error" - Error notifications
