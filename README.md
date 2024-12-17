# BrainBooster

## Overview
BrainBooster is a web application designed to enhance your learning experience. It leverages the MERN (MongoDB, Express.js, React.js, Node.js) stack to provide users with a platform where they can create and manage study sets. The application incorporates user authentication and authorization using JWT (JSON Web Tokens), ensuring secure access to study materials.
## Application Demo
### Creating Study Set
![createStudySetGIF](https://github.com/user-attachments/assets/72374605-0199-401a-becc-96b5677134ed)
### Exam Option
![demoExamGIF](https://github.com/user-attachments/assets/93108da2-ab21-416b-8f44-d7725e187425) 
### Matching Option
![MatchingGIF](https://github.com/user-attachments/assets/1f2b27d2-86fa-44a9-bb6b-52dd17b78ebc)
### Flashcards Option
![flashCardGIF](https://github.com/user-attachments/assets/3b505bfe-1ad3-4bf9-9098-19cddac72009)
### Responsive Website View
![Screenshot 2024-12-17 000501](https://github.com/user-attachments/assets/95aacbe0-89b0-4175-9435-1fc56013f611)
![Screenshot 2024-12-17 000527](https://github.com/user-attachments/assets/a4f7adcf-0ab0-4601-ab2c-8d3a08df7195)

## Features
- **User Registration and Authentication:** Users can sign up for an account or log in to an existing one, ensuring a personalized experience and data security.
- **JWT Authorization:** BrainBooster employs JSON Web Tokens (JWT) to handle user authorization. This technology ensures that only authenticated users can access their study sets and related functionalities.
- **Study Set Creation:** Users can create custom study sets to organize their learning materials effectively. Each study set can be given a title and description.
- **Study Options:** BrainBooster offers various study options to cater to different learning preferences. These options include flashcards, quizzes, and more, making it versatile for different subjects and topics.

## Technology Stack
**Frontend**:
  - **React**: Used for building the user interface with reusable components.
  - **CSS3**: Used for styling the application and creating a responsive layout.
    
**Backend**:
  - **Node.js**: A JavaScript runtime used for building the server-side logic.
  - **Express.js**: A minimal web framework for Node.js used for routing and handling HTTP requests.
  - **MongoDB**: A NoSQL database used to store user data and study sets.
  - **JSON Web Tokens (JWT)**: Used for secure user authentication and session management.

## Installation
1. **Install Node.js**: If Node.js is not installed, you can download it from [here](https://nodejs.org/en) and install it on your system.
2. **Add Node.js and npm to System PATH**: Ensure Node.js and npm are added to your system’s PATH for easy access in the terminal.
3. **Install nodemon globally** (optional, but useful for development to auto-restart the server):
   npm install -g nodemon


## Run Application
**Split Terminal:** You will need to run both the frontend and backend servers at the same time.
Run command **npm run dev** on server and web directory


