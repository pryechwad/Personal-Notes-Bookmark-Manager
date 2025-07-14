# NotesBook - Your Digital Memory Palace 🧠✨

A beautiful, full-featured personal notes and bookmark manager built with modern web technologies. Organize your thoughts, save your favorite links, and never lose an idea again.

![NotesBook Hero](https://via.placeholder.com/1200x600/667eea/ffffff?text=NotesBook+-+Digital+Memory+Palace)

## ✨ Features

### 🎨 **Beautiful Design**
- **Unique Color Combinations**: Custom gradient themes with purple-based color scheme
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile
- **Smooth Animations**: Floating elements, hover effects, and micro-interactions

### 📝 **Smart Notes**
- **Rich Text Support**: Create detailed notes with formatting
- **Tag Organization**: Categorize notes with custom tags
- **Powerful Search**: Full-text search across titles and content
- **Favorites System**: Mark important notes for quick access
- **CRUD Operations**: Create, read, update, and delete notes seamlessly

### 🔖 **Web Bookmarks**
- **URL Validation**: Automatic URL format checking
- **Auto-Title Fetching**: Automatically extract page titles from URLs
- **Description Support**: Add custom descriptions to your bookmarks
- **Tag Categorization**: Organize bookmarks with tags
- **External Link Handling**: Safe external link opening

### 🔍 **Advanced Search & Filtering**
- **Real-time Search**: Instant results as you type
- **Tag Filtering**: Filter by single or multiple tags
- **Favorites Filter**: Show only your favorite items
- **Combined Filters**: Use multiple filters simultaneously

### 🔐 **User Authentication**
- **JWT-based Security**: Secure token-based authentication
- **User Registration**: Beautiful signup flow with validation
- **Secure Login**: Protected routes and user sessions
- **Password Encryption**: bcrypt password hashing
- **User-specific Data**: Each user sees only their own content

### 📊 **Analytics & Insights**
- **Usage Statistics**: Track your notes and bookmarks count
- **Favorite Metrics**: See percentage of favorited items
- **Tag Analytics**: Most used tags and organization insights
- **Recent Activity**: Timeline of your latest additions

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Lucide React** - Consistent icon system
- **Context API** - State management for auth and theme

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server auto-restart
- **dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/notesbook.git
   cd notesbook
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/notesbookdb
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

7. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

8. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### Getting Started
1. **Sign Up**: Create your free account with name, email, and password
2. **Explore**: Check out the beautiful hero section and features
3. **Create Notes**: Start capturing your thoughts and ideas
4. **Save Bookmarks**: Add your favorite websites with descriptions
5. **Organize**: Use tags to categorize your content
6. **Search**: Find anything instantly with powerful search
7. **Customize**: Switch between light and dark themes

### Tips & Tricks
- **Keyboard Shortcuts**: Use Ctrl/Cmd + K for quick search
- **Tag Strategy**: Use consistent, descriptive tags for better organization
- **Favorites**: Mark important items for quick access from dashboard
- **Search Operators**: Use quotes for exact phrase matching
- **Bulk Actions**: Select multiple items for batch operations

## 🎨 Design System

### Color Palette
- **Primary**: Purple-based gradient system
- **Gradients**: 5 unique gradient combinations
- **Semantic Colors**: Success, warning, error, and info states
- **Dark Mode**: Carefully crafted dark theme variants

### Typography
- **Headings**: Bold, gradient text for emphasis
- **Body**: Readable font sizes with proper line height
- **Code**: Monospace font for technical content

### Components
- **Cards**: Elevated surfaces with hover effects
- **Buttons**: Multiple variants with consistent styling
- **Forms**: Accessible inputs with validation states
- **Navigation**: Intuitive menu with active states

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Notes
- `GET /api/notes` - Get user notes (with search/filter)
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `PATCH /api/notes/:id/favorite` - Toggle favorite status

### Bookmarks
- `GET /api/bookmarks` - Get user bookmarks (with search/filter)
- `POST /api/bookmarks` - Create new bookmark
- `PUT /api/bookmarks/:id` - Update bookmark
- `DELETE /api/bookmarks/:id` - Delete bookmark
- `PATCH /api/bookmarks/:id/favorite` - Toggle favorite status

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test

# Run e2e tests
npm run test:e2e
```

## 📦 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Create new app on your platform
2. Set environment variables
3. Connect to MongoDB Atlas for production database
4. Deploy from GitHub repository

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Set up cluster and database
3. Configure network access and database users
4. Update MONGO_URI in environment variables

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add JSDoc comments for functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Lucide** for the consistent icon system
- **Tailwind CSS** for the utility-first approach
- **Next.js** team for the amazing framework
- **MongoDB** for the flexible database solution

## 📞 Support

- **Documentation**: [docs.notesbook.app](https://docs.notesbook.app)
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/notesbook/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/notesbook/discussions)
- **Email**: support@notesbook.app

## 🗺️ Roadmap

### Version 1.1
- [ ] Export/Import functionality
- [ ] Markdown support in notes
- [ ] Collaborative features
- [ ] Mobile app (React Native)

### Version 1.2
- [ ] Advanced search with operators
- [ ] Note templates
- [ ] Backup and sync
- [ ] Browser extension

### Version 2.0
- [ ] AI-powered suggestions
- [ ] Voice notes
- [ ] Team workspaces
- [ ] Advanced analytics

---

**Made with ❤️ for organized minds**

*NotesBook - Your Digital Memory Palace*