## Stitchr Backend

Welcome to the Stitchr Backend repository! This project contains the server-side code that powers the Stitchr social media platform. It handles various functionalities, such as user authentication, post management, followers, and more.

## Table of Contents

- Features
- Getting Started
  - Prerequisites
  - Installation
- Contributing
- License

## Features

- User Authentication: Secure user registration and login mechanisms.
- Stitch Management: Post, retrieve, and delete stitch.
- Followers/Following: Manage user relationships and follow other users.
- Search: Find users and tweets with a powerful search functionality.
- Comments/Replies : User can make comment and reply on posts
- Like/Dislike: User can like and dislike posts

## Getting Started

To run the Stitchr backend locally or contribute to the project, follow the instructions below.

## Prerequisites

- Node.js
- Docker
- Docker Compose

## Installation

1.  Clone the repository:

    ```shell
    git clone https://github.com/ayushkavad/Stitchr.git
    cd Stitchr
    ```

2.  Create .env file

    ```dotenv
    NODE_ENV=development
    HOST=127.0.0.1
    PORT=8080

    <!-- Database configuration -->

    <!--FOR  REMOTE DATABASE -->
    DATABASE_URL='your mongodb database string'
    DATABASE_ROOT_USER='remote database username'
    DATABASE_ROOT_PASSWORD='remote database password'

    <!--FOR LOCAL DATABASE -->
    DATABASE_LOCAL=mongodb://localhost:27017/stitchr

    <!-- JWT configuration -->
    JWT_SECRET='jwt secret'
    EXPIRES_IN=90d
    JWT_COOKIE_EXPIRES_IN=90

    <!-- Nodemailer configuration -->
    EMAIL_HOST=sandbox.smtp.mailtrap.io
    EMAIL_PORT=2525
    EMAIL_USER='nodemailer user'
    EMAIL_PASSWORD='nodemailer password'

    ```

3.  Build and start the containers using Docker Compose:

    ```shell
    docker compose up
    ```

    This command will spin up the backend services along with the MongoDB database. The backend will be accessible at `http://localhost:8080`, The MongoDB database will be running on `localhost` on port `27017`.

## Contribution Guidelines

We welcome contributions to improve the Stitchr backend!

To contribute to this project, please follow these guidelines:

- Fork the repository and make your changes in a new branch.
- Ensure that your code is well-documented and follows the existing coding style.
- Write clear commit messages for your changes.
- Open a pull request with a detailed description of your changes.

## Authors

- Ayush Kavad
  - This project is authored by Ayush Kavad.

## Acknowledgments

- [Docker](https://www.docker.com/) for containerization.
- [Docker Compose](https://docs.docker.com/compose/) for multi-container application orchestration.

## License

This project is licensed under the MIT License.

We hope you find this Twitter Backend project exciting and valuable!
