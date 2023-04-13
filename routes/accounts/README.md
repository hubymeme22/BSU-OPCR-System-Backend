# Accounts Route
This routes are made for logging in and signing up accounts to the server.

## Routes and Methods
### Signing up / Register account
- **POST** /api/register
  - Registers an account provided
  - Request body parameters: `username`, `email`, `password`, `name`
  - The `name` parameter is an object that contains the following sub parameters:
    - `first` (required)
    - `middle` (optional)
    - `last` (required)
- Format:
  ```JSON
  {
    "username": "HueHueberry",
    "email": "sampleemail@gmail.com",
    "password": "...",
    "name": {
        "first": "Hubert",
        "middle": "F",
        "last": "Espinola"
    }
  }
  ```
- Sample response
  ```JSON
  { "registered": true, "error": null }
  ```

### Logging in an account
- **POST** /api/login
  - Logs in an account and returns token that will indicate the user's permission.
  - Request body parameters: `username`, `password`
- Format
  ```JSON
  { "username": "...", "password": "..." }
  ```
- Sample response:
  ```JSON
  { "isLoggedIn": true, "token": "...", "error": null }
  ```