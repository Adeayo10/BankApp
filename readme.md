# Core Banking Application

This project is a core banking application that allows users to manage customer accounts, perform transactions, and handle user operations. Users can also be created and managed within the system.

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- MySQL
- Git

### Backend Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/BankApp.git
    ```

2. **Navigate to the backend directory:**
    ```bash
    cd BankApp/backend
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up the database:**
    - Ensure MySQL is installed and running.
    - Log in to MySQL and create the database:
      ```sql
      CREATE DATABASE core_banking;
      CREATE USER 'root'@'localhost' IDENTIFIED BY 'your-mysql-password';
      GRANT ALL PRIVILEGES ON core_banking.* TO 'root'@'localhost';
      FLUSH PRIVILEGES;
      ```

5. **Configure environment variables:**
    - Create a `.env` file in the `backend` directory and add the following content:
      ```env
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=your-mysql-password
      DB_NAME=core_banking
      JWT_SECRET=your-jwt-secret
      EMAIL_USER=your-email
      EMAIL_PASS=your-email-password
      ```

6. **Run database migrations:**
    ```bash
    node -e 'require("./config/database").sync({ force: false })'
    ```

7. **Start the backend server:**
    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2. **Create the `docs` directory:**
    ```bash
    mkdir docs
    ```

3. **Move frontend files to the `docs` directory:**
    ```bash
    mv * docs/
    ```

4. **Serve the frontend using Nginx:**
    - Copy the frontend files to the Nginx web root directory:
      ```bash
      sudo cp -r docs/* /var/www/html/
      ```

5. **Configure Nginx:**
    - Create a new Nginx configuration file:
      ```bash
      sudo nano /etc/nginx/sites-available/default
      ```
    - Add the following content to the file:
      ```nginx
      server {
          listen 80;
          server_name your-ec2-public-ip;

          location / {
              root /var/www/html;
              index index.html index.htm;
              try_files $uri $uri/ /index.html;
          }

          location /api/ {
              proxy_pass http://localhost:3000/;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
      }
      ```
    - Save and close the file.

6. **Restart Nginx:**
    ```bash
    sudo systemctl restart nginx
    ```

### Access the Application

- **Frontend**: Open your browser and navigate to `http://your-ec2-public-ip`.
- **Backend**: The backend API is accessible at `http://your-ec2-public-ip/api`.

### Additional Information

- **GitHub Pages Deployment**:
  - If you prefer to deploy the frontend using GitHub Pages, ensure your frontend files are in the `docs` directory and configure GitHub Pages to serve from the `docs` directory.

- **Environment Variables**:
  - Ensure all necessary environment variables are set in the `.env` file for both local development and production environments.

### Troubleshooting

- **Database Connection Issues**:
  - Ensure MySQL is running and the credentials in the `.env` file are correct.
  - Check the MySQL user permissions and ensure the database exists.

- **Nginx Configuration**:
  - Verify the Nginx configuration file for any syntax errors.
  - Ensure Nginx is restarted after making changes to the configuration file.

