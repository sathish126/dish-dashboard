# Dish Management Dashboard

A modern, responsive, and real-time Dish Management Dashboard built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. This dashboard allows you to toggle the publication status of various dishes and updates all connected clients instantly using WebSockets.

> [!NOTE]
> The assignment document referenced a JSON dataset, but the dataset was not attached. Sample dish data has been used for demonstration purposes. The application supports importing any provided dataset without structural changes.

---

## 🛠️ Tech Stack

### Backend
- Express.js
- MongoDB (Mongoose)
- Socket.IO

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Socket.IO Client

---

## ⚙️ Environment Configuration

The project is configured using MongoDB Atlas through environment variables.

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dish-dashboard
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 🚀 Installation & Local Development

Ensure you have [Node.js](https://nodejs.org/) and a running [MongoDB](https://www.mongodb.com/try/download/community) instance on your machine.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd dish-dashboard
   ```

2. **Install all dependencies** (runs installer in root, backend, and frontend directories):
   ```bash
   npm run install:all
   ```

3. **Run in development mode:**
   ```bash
   npm run dev
   ```
   This will start:
   - Backend Express server on `http://localhost:5000`
   - Frontend Vite development server on `http://localhost:5173`

---

## 📡 API Endpoints

### Dishes
- **`GET /api/dishes`**
  - **Description:** Returns all dishes in the database, ordered by `dishId` ascending.
  - **Response Status:** `200 OK`
  - **JSON Output:**
    ```json
    {
      "success": true,
      "count": 10,
      "data": [
        {
          "dishId": 1,
          "dishName": "Biryani",
          "imageUrl": "https://...",
          "isPublished": true,
          "createdAt": "2026...",
          "updatedAt": "2026..."
        }
      ]
    }
    ```

- **`PATCH /api/dishes/:id/toggle`**
  - **Description:** Toggles the `isPublished` Boolean status of the dish matching the numerical `dishId` parameter (e.g., `/api/dishes/1/toggle`).
  - **Response Status:** `200 OK` / `404 Not Found`
  - **Websocket Action:** Emits a `dishUpdated` payload containing the modified dish object.
  - **JSON Output:**
    ```json
    {
      "success": true,
      "data": {
        "dishId": 1,
        "dishName": "Biryani",
        "imageUrl": "https://...",
        "isPublished": false
      }
    }
    ```

---

## 🌐 Real-Time Websockets (Socket.IO)

- When a client toggles publication, the server saves the state change in MongoDB and broadcasts a `dishUpdated` event to all connections.
- Subscribing clients receive the updated object via the `useSocket` hook and update their UI lists instantly, maintaining state synchronization across all screens.

---

## ☁️ Deployment Instructions

### Backend (Render)
1. Sign in to [Render](https://render.com/) and create a **Web Service**.
2. Connect your GitHub repository.
3. Configure the following build settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. In **Environment Variables**, add:
   - `PORT=10000`
   - `MONGODB_URI`: *Your MongoDB Atlas connection string.*
   - `CLIENT_URL`: *Your deployed frontend URL (e.g. `https://your-app.vercel.app`).*

### Frontend (Vercel)
1. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select your repository.
3. Configure the project settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: *Your deployed Render backend URL + `/api` (e.g. `https://your-api.onrender.com/api`).*
   - `VITE_SOCKET_URL`: *Your deployed Render backend URL (e.g. `https://your-api.onrender.com`).*

---

## 📽️ Demo & Explanation Scripts

### 1-Minute Demo Video Script
> **Visual:** Open two browser windows side-by-side on screen. Both display the dashboard. In the background, open the MongoDB Compass tool showing the `dishes` collection.
>
> **Narrator:**
> "Hello! Today I am demonstrating the Dish Management Dashboard built for the assignment submission.
> 
> As you can see, we have a responsive dashboard displaying dish names, high-quality images, and publication statuses. At the top of the screen, we have live counter cards tracking the Total, Published, and Unpublished count, alongside a connection status dot showing we are synced to the backend Socket server.
> 
> If I click 'Unpublish' on Biryani in the left-hand browser, notice how the right-hand browser updates *instantly* to red, without requiring a manual reload. The card status switches, and our stats update immediately. If I toggle it back, the status syncs back to green on both sides.
> 
> This is powered by a custom Socket.IO connection that broadcasts changes as soon as they hit the database, ensuring zero lag."

---

### 1-Minute Code Explanation Script
> **Visual:** Screen shares VS Code displaying the folder tree, highlighting `backend/src/controllers/dish.controller.js` and `frontend/src/hooks/useSocket.js`.
>
> **Narrator:**
> "Let's review the code structure.
> 
> On the backend, we run an Express.js server linked to MongoDB using Mongoose. In our `server.js`, we establish connection and seed 10 default Indian dishes on start if the collection is empty.
> 
> The toggling logic resides in the controller. On calling `PATCH /api/dishes/:id/toggle`, we lookup the dish by its custom `dishId`, flip its `isPublished` value, save to the database, and fetch the `io` instance bound to the app to emit a `dishUpdated` event.
> 
> On the frontend, we use React and Tailwind. The real-time synchronization is driven by a custom React hook `useSocket`. It connects to the Socket.IO client and updates a stable callback reference using `useRef` to prevent re-instantiating the connection on every render. When the event fires, the Dashboard state updates state arrays locally, giving us reactive updates."

---

## 📸 Screenshots Section

Add screenshots showcasing the dashboard:
- Desktop view with 4 columns.
- Mobile view showing responsive stack cards.
- Side-by-side real-time sync action.
