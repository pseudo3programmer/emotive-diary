
# Emotivo Journal - Full Stack Journal Application

Emotivo Journal is a full-stack journal application that helps users track and understand their emotions.

## Project Structure

This project consists of:

1. A React/TypeScript frontend
2. A Java Spring Boot backend
3. An H2 SQL database

## Frontend Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Router
- Recharts for visualizations

## Backend Tech Stack

- Java 17
- Spring Boot
- Spring Data JPA
- H2 Database (can be replaced with MySQL, PostgreSQL, etc.)
- Maven

## Getting Started

### Running the Frontend

```sh
# Install dependencies
npm i

# Start the development server
npm run dev
```

### Running the Backend

```sh
# Navigate to the backend directory
cd backend

# Build the application
mvn clean install

# Run the application
mvn spring-boot:run
```

## Features

- Create journal entries with emotion analysis
- View a timeline of past entries
- Search and filter entries by content or emotion
- Export journal data as JSON
- Persistent storage in a SQL database

## Architecture

- The frontend communicates with the backend via RESTful API calls
- The backend uses Spring Data JPA to interact with the database
- Journal entries and their emotion analyses are stored in related database tables

## API Endpoints

- `GET /api/journal` - Get all journal entries
- `POST /api/journal` - Create a new journal entry
- `GET /api/journal/{id}` - Get a specific entry
- `DELETE /api/journal/{id}` - Delete an entry
- `GET /api/journal/search?query={text}` - Search entries by content
- `GET /api/journal/emotion/{emotion}` - Filter entries by emotion

## Next Steps

- Add user authentication
- Implement more advanced emotion analysis
- Add data visualization for emotional trends over time
- Support for image attachments in journal entries
