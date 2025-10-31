# Recipe Searcher -BACKEND

## RecipeAppB Backend

**Front-end link:** [RecipeAppF](https://recipe-app-f.vercel.app/)

This is the backend of the RecipeAppB project, built with Node.js, Express, and MongoDB.  
It handles user authentication, recipe management, and fetching recipes from the external Spoonacular API.  
Users can save their favorite recipes, search by ingredients, and access detailed recipe information.

---

## 🚀 Technologies Used

- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JSON Web Tokens (JWT)  
- bcrypt for password hashing  
- CORS  
- Dotenv for environment variables  
- Node-fetch for external API requests  
- UUID  

---

## 📦 API Endpoints

**Authentication**  
- `POST /api/v1/auth/signup` – Register a new user  
- `POST /api/v1/auth/login` – Login and get a token  

**Recipes** *(Protected Routes)*  
- `GET /api/v1/recipes` – Get all user’s saved recipes  
- `POST /api/v1/recipes` – Save a new recipe  
- `GET /api/v1/recipes/:id` – Get a recipe by ID  
- `PUT /api/v1/recipes/:id` – Update a recipe  
- `DELETE /api/v1/recipes/:id` – Delete a recipe  
- `GET /api/v1/recipes/check/:externalId` – Check if a recipe is already saved  

**Search & External Recipes**  
- `GET /api/v1/search?ingredients=INGREDIENTS` – Search recipes by ingredients (calls Spoonacular API)  
- `GET /api/v1/external/:id` – Get detailed recipe information from Spoonacular API  

> 🔹 Note: Recipe searches are powered by [Spoonacular API](https://spoonacular.com/food-api).  

---

## 💡 Key Features

- JWT-based authentication (signup & login)  
- Users can save, update, delete, and check favorite recipes  
- Search recipes by ingredients via Spoonacular API  
- Fetch detailed recipe information from external API  
- Protected routes to ensure only authenticated users can access their data  

---

## 📬 Contact

- LinkedIn: [Facundo Robert](https://www.linkedin.com/in/robertfacundodev/)
- - Portfolio: [My Portfolio](https://facundorobert.vercel.app/) 
- Email: robertf.coder@gmail.com
