# EventNet

EventNet is a full-stack event networking platform that allows users to join events using a code, view attendees, and manage profiles. Built using React, Node.js, Express, and MongoDB. These are just the features so far, more coming very soon.

---

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/eventnet.git
cd eventnet
```

---

### 2. Setup the Backend

```bash
cd eventnet-backend
npm install
```

Create a `.env` file in the root of `eventnet-backend`:

```env
PORT=5001
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Setup the Frontend

```bash
cd ../eventnet-frontend
npm install
```

Start the React app:

```bash
npm run dev
```

---

### 4. Access the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5001/api](http://localhost:5001/api)

Make sure both servers are running simultaneously.

---