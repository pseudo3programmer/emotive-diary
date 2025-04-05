
# Emotivo Journal Backend

This is the backend server for the Emotivo Journal application. It's built with Java Spring Boot and uses a SQL database to store journal entries and emotion analyses.

## Features

- RESTful API for journal entries CRUD operations
- SQL database for persistent storage
- Spring Data JPA for database interactions
- H2 in-memory database for development (can be replaced with production database)
- Cross-origin resource sharing (CORS) enabled

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven

### Running the Application

1. Navigate to the backend directory
```
cd backend
```

2. Build the application
```
mvn clean install
```

3. Run the application
```
mvn spring-boot:run
```

The server will start on http://localhost:8080/api

### API Endpoints

- `GET /api/journal` - Get all journal entries
- `GET /api/journal/{id}` - Get a specific journal entry
- `POST /api/journal` - Create a new journal entry
- `DELETE /api/journal/{id}` - Delete a journal entry
- `GET /api/journal/search?query={text}` - Search journal entries by text
- `GET /api/journal/emotion/{emotion}` - Get entries with a specific primary emotion

### H2 Console

The H2 database console is available at http://localhost:8080/api/h2-console

- JDBC URL: jdbc:h2:file:./emotivo_db
- Username: sa
- Password: password

## Database Structure

The application uses the following database tables:

1. `journal_entries` - Stores the main journal entry information
2. `emotion_analyses` - Stores the emotional analysis for each entry
3. `emotion_scores` - Stores individual emotion scores for each analysis
