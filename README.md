# 🏆 Online Judge Platform

Welcome to the **Online Judge Platform** - your go-to solution for coding challenges and competitive programming! This platform allows developers to practice coding, participate in contests, and improve their programming skills. Built with modern web technologies, our platform is designed for performance, scalability, and ease of use.
![image](https://github.com/YashSinha047/online-judge/assets/121245329/19a95aec-00da-4340-95fc-7cf6b3ac9d68)


## 🚀 Features

- **👤 User Authentication:** Secure sign-up and login functionality with JWT.
- **📚 Problem Management:** Admins can add, update, and delete coding problems.
- **💻 Code Submission:** Users can submit their solutions for automated evaluation.
- **🔄 Real-time Feedback:** Instant feedback on the submitted solutions.
- **🌐 Multi-language Support:** Supports multiple programming languages for submissions.

## 🛠 Tech Stack

### Frontend

- **React:** A JavaScript library for building user interfaces.
  
 ![image](https://github.com/YashSinha047/online-judge/assets/121245329/287bb51b-cc9b-4eea-9ddb-6c0573d42d7c)

- **Axios:** Promise-based HTTP client for making requests.
- **React Router:** Declarative routing for React applications.
- **CSS:** For styling the application.

### Backend

- **Node.js:** JavaScript runtime built on Chrome's V8 engine.
  
  ![image](https://github.com/YashSinha047/online-judge/assets/121245329/16c03f57-2de6-43aa-9935-9ad709c31573)

- **Express:** A minimal and flexible Node.js web application framework.
  
  ![image](https://github.com/YashSinha047/online-judge/assets/121245329/0b5597ba-481c-447b-8b43-5793169d0384)

- **MongoDB Atlas:** Cloud database service for storing application data.
  
  ![image](https://github.com/YashSinha047/online-judge/assets/121245329/f1dabb2c-93a6-4851-bb63-404b28bdc463)

- **Mongoose:** Elegant MongoDB object modeling for Node.js.
  
- **JWT (JSON Web Tokens):** Secure token-based authentication for verifying users.
  
  ![image](https://github.com/YashSinha047/online-judge/assets/121245329/1ade360e-6d99-4875-9868-b7a5e3c170f4)


### DevOps

- **Docker:** Platform for developing, shipping, and running applications in containers.
  
  ![image](https://github.com/YashSinha047/online-judge/assets/121245329/855e6a96-0dd7-46a2-a518-209fd5cada42)

- **AWS EC2:** Scalable virtual servers in the cloud for running the backend.
  
  ![image](https://github.com/YashSinha047/online-judge/assets/121245329/0a1ec70e-845e-4e3a-bf12-b97947f513b5)

- **AWS ECR:** Managed AWS Docker registry service.
  
  ![image](https://github.com/YashSinha047/online-judge/assets/121245329/7407726e-e153-44e4-a969-3b4e78dfdab8)


## ⚙️ Installation

### Prerequisites

- **Node.js:** Install from [nodejs.org](https://nodejs.org/).
- **MongoDB Atlas:** Create an account at [mongodb.com](https://www.mongodb.com/atlas).
- **Docker:** Install from [docker.com](https://www.docker.com/get-started).

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd online-judge/backend

2. Create a .env File:
   ```
   PORT=4000
   MONGO_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-jwt-secret>

4. Build and Run Docker Container:
   ```
   docker build -t online-judge-backend .
   docker run -p 4000:4000 online-judge-backend

Frontend Setup

1. Navigate to the Frontend Directory:
   ```
   cd ../frontend

3. Install Dependencies:
   ```
   npm install

5. Create a .env File:
   ```
   REACT_APP_API_BASE_URL=http://<your-backend-url>:4000

7. Start the Development Server:
   ```
   npm start


Deployment

1. Push Docker Image to ECR:
   Authenticate Docker to ECR:
   ```
   aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-ecr-repo-url>
   ```
   Tag the Docker Image:
   ```
   docker tag online-judge-backend:latest <your-ecr-repo-url>:latest
   ```
   Push the Image:
   ```
   docker push <your-ecr-repo-url>:latest
   ```

3. Deploy on EC2:
   
   SSH into Your EC2 Instance:
   ```
   ssh -i <path-to-your-ssh-key.pem> ec2-user@<your-ec2-public-dns>
   ```
   Pull the Docker Image:
   ```
   docker pull <your-ecr-repo-url>:latest
   ```
   Run the Docker Container:
   ```
   docker run -d -p 4000:4000 <your-ecr-repo-url>:latest
   ```

Frontend Deployment

Deploy your frontend application to a static site hosting service such as Vercel, Netlify, or AWS S3 + CloudFront.
   
