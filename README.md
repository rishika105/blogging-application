# 📝 Blogging Application

A full-stack **blogging platform** built using **Node.js, Express, MongoDB, EJS, and TailwindCSS**.  
It allows users to register, log in, create blogs with images, like/unlike posts, and comment on them.  

---

## 🚀 Features
- 🔐 User Authentication (Signup, Login, Logout) with JWT & Cookies  
- ✍️ Create and publish blogs with images (Multer for uploads)  
- ❤️ Like & Unlike blogs without page reload
- 💬 Comment on blogs  
- 🎨 Responsive UI built with **EJS + TailwindCSS**  
- 🛡️ Cache prevention for secure login/logout  
- 📄 Static About and Contact pages  

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js  
- **Frontend**: EJS Templates + TailwindCSS  
- **Database**: MongoDB (Mongoose)  
- **Authentication**: JWT + Cookies  
- **File Uploads**: Multer  
- **AJAX (without reload)**: Fetch API  


## ⚡ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/blogging-application.git
   cd blogging-application
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory

   ```env
   PORT=5000
   MONGODB_URL=your_mongo_db_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

   The application will be available at 👉 [http://localhost:5000](http://localhost:5000)

---

## 📌 Future Improvements

* 🧑‍💻 User profile & dashboard
* 🏷️ Blog categories & tags
* 🖋️ Rich text editor for blog writing
* ☁️ Suggestions based on user interests

