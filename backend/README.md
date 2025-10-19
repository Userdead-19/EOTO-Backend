# EOTO Backend

A Node.js/Express backend for the EOTO student collaboration platform with MongoDB integration.

## Setup

1. Install dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`

2. Create a `.env` file:
\`\`\`
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key-change-in-production
MONGODB_URI=mongodb://localhost:27017/eotomain
\`\`\`

For MongoDB Atlas (cloud), use:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eotomain?retryWrites=true&w=majority
\`\`\`

3. Ensure MongoDB is running (see `MONGODB_SETUP.md` for detailed instructions)

4. Start the server:
\`\`\`bash
npm run dev
\`\`\`

The backend will run on `http://localhost:5000`

## Database

This backend uses **MongoDB** with **Mongoose** ODM for data persistence. See `MONGODB_SETUP.md` for setup instructions.

### Collections
- **users** - User accounts and profiles
- **groups** - Study groups
- **tasks** - Tasks and assignments
- **grades** - Grade records
- **calendars** - Calendar events
- **resources** - Shared resources
- **connections** - User connections/networking

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:userId` - Get user by ID

### Groups
- `POST /api/groups` - Create group
- `GET /api/groups` - Get all groups
- `GET /api/groups/:groupId` - Get group by ID
- `POST /api/groups/:groupId/join` - Join group
- `POST /api/groups/:groupId/leave` - Leave group

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get user's tasks
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task

### Grades
- `POST /api/grades` - Add grade
- `GET /api/grades` - Get user's grades
- `GET /api/grades/subject/:subject` - Get grades by subject

### Calendar
- `POST /api/calendar` - Create event
- `GET /api/calendar` - Get user's events
- `PUT /api/calendar/:eventId` - Update event
- `DELETE /api/calendar/:eventId` - Delete event

### Resources
- `POST /api/resources` - Create resource
- `GET /api/resources` - Get all resources
- `GET /api/resources/group/:groupId` - Get group resources

### Connections
- `POST /api/connections/request` - Send connection request
- `POST /api/connections/:connectionId/accept` - Accept connection
- `GET /api/connections` - Get user's connections
- `GET /api/connections/pending` - Get pending requests

## Authentication

All protected endpoints require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

Tokens are issued on login/register and expire after 7 days.

## Project Structure

\`\`\`
backend/
├── models/              # Mongoose schemas
│   ├── User.js
│   ├── Group.js
│   ├── Task.js
│   ├── Grade.js
│   ├── Calendar.js
│   ├── Resource.js
│   └── Connection.js
├── routes/              # API route handlers
│   ├── auth.js
│   ├── users.js
│   ├── groups.js
│   ├── tasks.js
│   ├── grades.js
│   ├── calendar.js
│   ├── resources.js
│   └── connections.js
├── middleware/          # Express middleware
│   └── auth.js
├── db.js               # MongoDB connection
├── server.js           # Express app setup
├── package.json
└── .env                # Environment variables (create this)
\`\`\`

## Development

- `npm run dev` - Start with nodemon (auto-reload on changes)
- `npm start` - Start production server

## Troubleshooting

See `MONGODB_SETUP.md` for MongoDB-specific troubleshooting.

### Common Issues

**Port already in use:**
\`\`\`bash
# Change PORT in .env or kill the process using port 5000
lsof -i :5000
kill -9 <PID>
\`\`\`

**CORS errors:**
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Default is `http://localhost:5173`

**Authentication failures:**
- Check JWT_SECRET is set in `.env`
- Verify token is being sent in Authorization header
