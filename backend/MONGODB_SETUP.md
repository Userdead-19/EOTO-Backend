# MongoDB Setup Guide for EOTO Backend

This guide will help you set up MongoDB for the EOTO backend application.

## Option 1: Local MongoDB Installation

### macOS (using Homebrew)
\`\`\`bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
\`\`\`

### Windows
1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a Windows Service and start automatically

### Linux (Ubuntu/Debian)
\`\`\`bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
\`\`\`

## Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Create a database user with username and password
5. Get your connection string
6. Add your IP address to the IP whitelist

## Configuration

### Local MongoDB
Create a `.env` file in the backend directory:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/eotomain
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
\`\`\`

### MongoDB Atlas
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eotomain?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
\`\`\`

## Verify MongoDB Connection

1. Start the backend server:
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

2. You should see:
\`\`\`
MongoDB connected successfully
Server running on port 5000
\`\`\`

3. Test the health endpoint:
\`\`\`bash
curl http://localhost:5000/api/health
\`\`\`

## Database Collections

The following collections will be automatically created when you first use the API:

- **users** - User accounts and profiles
- **groups** - Study groups
- **tasks** - Tasks and assignments
- **grades** - Grade records
- **calendars** - Calendar events
- **resources** - Shared resources
- **connections** - User connections/networking

## Troubleshooting

### Connection Refused
- Ensure MongoDB is running: `brew services list` (macOS) or check Services (Windows)
- Check if port 27017 is available

### Authentication Failed (Atlas)
- Verify username and password in connection string
- Check IP whitelist includes your current IP
- Ensure database user has proper permissions

### Collections Not Created
- Collections are created automatically on first use
- If needed, you can manually create them in MongoDB Compass

## MongoDB Compass (GUI Tool)

For easier database management, download MongoDB Compass:
https://www.mongodb.com/products/compass

Connect with your MongoDB URI to browse and manage data visually.
