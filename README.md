# Social Media App

A basic social media application that allows users to create accounts, make posts, like and comment on posts. It provides a user-friendly interface built with React and Material-UI on the frontend, and a Node.js and Express server on the backend. The data is stored in a MongoDB database.

## Features

- **User Authentication:**
  - Users can create accounts, log in, and have personalized experiences based on their profiles.
- **User Profile:**
  - Each user has a profile with a description and a photo.
- **Follow Functionality:**
  - Users can follow each other to stay updated on their activities.
- **Who to Follow Suggestions:**
  - The application provides suggestions on who to follow based on user interactions.
- **Post Creation:**
  - Users can post messages with photos to share with their followers.
- **Newsfeed:**
  - The newsfeed displays posts from followed users, providing a dynamic and engaging experience.
- **Listing Posts by User:**
  - Users can view a list of posts created by a specific user.
- **Likes and Comments:**
  - Users can engage with posts through likes and comments.
- **Responsive Design:**
  - The application is designed to be responsive and user-friendly across various devices.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have the following installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

### Installing

A step by step series of examples that tell you how to get a development env running

1. **Clone the repository:**

```bash
git clone https://github.com/mohammedhassad/social-media-app.git
```

2. **Install dependencies:**

```bash
cd social-media-app
npm install

cd client
npm install
```

3. **Set up the environment variables:**

Create a `.env` file in the root directory and set the required environment variables. You can use the provided `example.env` as a template.

4. **Run the application:**

```bash
cd social-media-app
npm start  # The application will be accessible at http://localhost:5000

cd client
npm start  # The application will be accessible at http://localhost:5173
```

## Tech Stack

- [React](https://react.dev/) - A JavaScript library for building user interfaces.
- [Material-UI](https://mui.com/) - A React UI framework for building responsive and accessible UIs.
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com/try/download/community) - A NoSQL database for storing and retrieving data.
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [JSON Web Token](https://jwt.io/) - Security token
- [Postman](https://www.getpostman.com/) - API testing

## Folder Structure

```
social-media-app/
|-- client/            # Frontend code (React)
|-- src/               # Backend code (Node.js, Express)
|-- .gitignore         # Git ignore file
|-- .babelrc           # Babel configuration for JavaScript transpilation
|-- index.js           # Project entry point
|-- package.json       # Node.js dependencies and scripts
|-- README.md          # Project documentation
|-- example.env        # Example environment variable file
|-- LICENSE            # License file for the project
```

## Contributing

Pull requests are welcome but please open an issue and discuss what you will do before 😊

## Known Bugs

Feel free to email me at [Email](mailto:mohammed.hassad98@gmail.com) or [Lnkedin](https://linkedin.com/me/mohemedhassad) if you run into any issues or have questions, ideas or concerns. Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

## License

This project is licensed under the [MIT License](/LICENSE). Feel free to use, modify, and distribute the code.
