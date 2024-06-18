# ShelpCamp

Welcome to **ShelpCamp** – your ultimate online hub for discovering and sharing the best campgrounds around the world! Whether you're an avid camper looking for new adventures or a campground owner wanting to showcase your site, ShelpCamp provides a seamless experience with user authentication, dynamic campground listings, and robust review features. We've integrated the latest technologies to ensure a smooth and visually appealing experience for all users.

**Also the whole code is on the "master" branch. Download and try it on your machine locally by following the steps mentioned in the [Installation and Running code](#installation) section.**

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Running code](#installation)
- [Usage](#usage)
- [Database Seeding](#database-seeding)
- [Contributing](#contributing)

## Features
- **View Campgrounds**: Browse a list of all campgrounds.
- **Add Campgrounds**: Registered users can add new campgrounds.
- **Edit and Delete Campgrounds**: Users can edit or delete campgrounds they own.
- **Add Reviews**: Users can add reviews to campgrounds.
- **Authentication**: User registration and login using Passport.js.
- **Authorization**: Only campground owners can edit or delete their campgrounds.

## Technologies Used
- **Frontend**:
  - HTML
  - CSS
  - JavaScript
  - EJS (Embedded JavaScript templating)
  - Bootstrap (latest version) for styling and enhanced user experience

- **Backend**:
  - Node.js
  - Express

- **Database**:
  - MongoDB

- **Authentication**:
  - Passport.js

- **Image Management**:
  - Cloudinary API
  - Unsplash API

## Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/hrishiii27/ShelpCamp.git
    cd shelpcamp
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    DATABASE_URL=<your-mongodb-url>
    SESSION_SECRET=<your-session-secret>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    UNSPLASH_ACCESS_KEY=<your-unsplash-access-key>
    ```

4. **Start the server**:
    ```bash
    nodemon index.js
    ```

5. **Visit the application**:
    Open your browser and go to `http://localhost:3004`.
    Use "/campgrounds" to navigate to the campgrounds index.

## Usage
- **View Campgrounds**: Navigate to the home page to see a list of campgrounds.
- **Add a New Campground**: Click on "Add New Campground" (requires login).
- **Edit/Delete Campgrounds**: Navigate to your campground and use the edit or delete options (available only to the owner).
- **Add Reviews**: Add a review on any campground's page (requires login).

## Database Seeding
Upon initial setup, the website will be empty as there is no data in the database. To populate the database with sample campgrounds and images, run the following command:
```bash
node seeds/index.js
```
This will seed the database with some sample campgrounds and their images, making the application functional and visually appealing.

## Screenshots

## HomePage
![image](https://github.com/hrishiii27/ShelpCamp/assets/158267376/78c08915-5ed0-4b1b-a505-bbec537e79df)

## Campgrounds index
![image](https://github.com/hrishiii27/ShelpCamp/assets/158267376/66a2e211-cd49-4a6d-ada8-f9c7346319e9)

## Login and Register Page
![image](https://github.com/hrishiii27/ShelpCamp/assets/158267376/27d50341-ea8b-4304-8fd7-e90a290df756)
![image](https://github.com/hrishiii27/ShelpCamp/assets/158267376/6a488ab0-ef6d-4ee4-9693-f17d5ff176ee)

## Add new campground
![image](https://github.com/hrishiii27/ShelpCamp/assets/158267376/03974d9d-6798-44d8-b9db-29de9bcb3cba)

## Edit a campground
![image](https://github.com/hrishiii27/ShelpCamp/assets/158267376/b41bfcf9-9fb7-4ef5-bcc1-ae371e97ec55)

## Individual campground show page
![image](https://github.com/hrishiii27/ShelpCamp/assets/158267376/c85b386b-989f-44c2-b70e-15b94d13493d)

## Add and delete reviews(only if its yours :-) )
![image](https://github.com/hrishiii27/ShelpCamp/assets/158267376/6dedf499-e178-44ce-b2d3-143b6495d8a9)


## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

Thank Youuu!
