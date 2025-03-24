# Product Store 🛒

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing products with CRUD operations and dark/light theme toggle.

## Features ✨
- **View Products**: Display all products with name, price, and image
- **Add Products**: Create new products with form validation
- **Edit Products**: Update existing product details
- **Delete Products**: Remove products from the store
- **Theme Toggle**: Switch between dark/light modes
- **Responsive Design**: Works on all screen sizes

## Tech Stack 💻
**Frontend**:
- React.js
- Context API (State Management)
- Axios (HTTP Client)
- CSS Modules/Styled Components

**Backend**:
- Node.js
- Express.js
- MongoDB/Mongoose
- CORS

## Installation ⚙️
1. Clone the repository:
```bash
git clone https://github.com/ANURAGGGGGGGGGGGG/productStore.git
cd productStore 
```

2. Backend Setup:
```
cd backend
npm install
```

3. Frontend Setup:
```
cd frontend
npm install
```

4. Create ```.env```  files:
- Backend ```(Backend/ .env)```
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/productstore
FRONTEND_URL=http://localhost:3000
```
- Frontend ```(frontend/ .env)```
```
REACT_APP_API_URL=http://localhost:8100
```

## Contributing 🤝
1. Fork the Project
2. Create your feature branch:
```
git checkout -b feature/amazing-feature
```
3. Commit your changes:
```
git commit -m 'Add some amazing feature'
```
4. Push to the branch:
```
git push origin feature/amazing-feature
```
5. Open a Pull Request

## Made with ❤️ by ```Anurag```
Link to My Product Store : ```https://productstore-1-bbhh.onrender.com/```