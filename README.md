# Real-Time Chat Application

A simple real-time chat application using Node.js, Express, and Socket.io.

## Features
- Real-time message broadcasting
- Auto-generated colorful usernames
- Message history persistence
- Responsive UI with Tailwind CSS
- Timestamped messages
- User connection/disconnection tracking

## Project Structure

backend/
├── server.js `server` 
├── public/
│   ├── index.html `index.html`
│   └── script.js `script.js`


## Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install express socket.io
```


## Running the Server
```bash
npm start
```
The server will start on port 3000. Access the chat at http://localhost:3000


## Key Components
### Server (server.js)
- Handles WebSocket connections using Socket.io
- Stores message history
- Manages user identities
- Broadcasts messages to all connected clients
### Client (index.html)
- Responsive chat interface
- Message input with enter key support
- Auto-scrolling chat history
- Tailwind CSS styling
## Dependencies
- Express.js
- Socket.io
- Tailwind CSS (via CDN)
## Future Improvements
- Add user typing indicators
- Implement rooms/channels
- Add message persistence
- Include user count display
- Add emoji support