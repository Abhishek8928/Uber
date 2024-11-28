# API Documentation for User Authentication

## Overview
This document provides details on the API endpoints for user registration and login, including the required data fields, their constraints, and example requests.

## Endpoints

### 1. Register User

#### Endpoint
```
POST /auth/register
```

#### Description
This endpoint allows a new user to register by providing their personal information. It validates the input fields and returns a token upon successful registration.

#### Request

##### Headers
- `Content-Type: application/json`

##### Body
The request body must be a JSON object containing the following fields:

| Field       | Type   | Required | Constraints                                                                 |
|-------------|--------|----------|-----------------------------------------------------------------------------|
| firstName   | string | Yes      | Must be between 4 and 14 characters long, only alphabetic characters allowed. |
| lastName    | string | Yes      | Must be between 4 and 14 characters long, only alphabetic characters allowed. |
| emailId     | string | Yes      | Must be a valid email format.                                              |
| password     | string | Yes      | Must meet strength requirements (e.g., minimum length, complexity).        |

**Example Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

#### Responses

1. **Success Response**
   - **Status Code**: `200 OK`
   - **Response Body**:
   ```json
   {
     "message": "user created successfully",
     "token": "your_jwt_token",
     "userId": "user_id_here"
   }
   ```

2. **Error Responses**
   - **400 Bad Request**: Missing credentials
     - **Response Body**:
     ```json
     {
       "error": "Missing credentials",
       "message": "Both emailId and password are required."
     }
     ```

   - **400 Bad Request**: Invalid data
     - **Response Body**:
     ```json
     {
       "error": "Invalid data",
       "message": "Some fields are not allowed."
     }
     ```

   - **400 Bad Request**: Validation failed
     - **Response Body**:
     ```json
     {
       "error": "Validation failed",
       "message": "Input fields are invalid."
     }
     ```

   - **500 Internal Server Error**: Server error
     - **Response Body**:
     ```json
     {
       "error": "Server error",
       "message": "Detailed error message here."
     }
     ```

### 2. Login User

#### Endpoint
```
POST /auth/login
```

#### Description
This endpoint allows an existing user to log in by providing their email and password.

#### Request

##### Headers
- `Content-Type: application/json`

##### Body
The request body must be a JSON object containing the following fields:

| Field       | Type   | Required | Constraints                                                                 |
|-------------|--------|----------|-----------------------------------------------------------------------------|
| emailId     | string | Yes      | Must be a valid email format.                                              |
| password     | string | Yes      | Must match the password stored in the database.                            |

**Example Request Body:**
```json
{
  "emailId": "user@example.com",
  "password": "StrongPassword123!"
}
```

#### Responses

1. **Success Response**
   - **Status Code**: `200 OK`
   - **Response Body**:
   ```json
   {
     "message": "Login successful",
     "token": "JWT_TOKEN_HERE",
     "userId": "USER_ID_HERE"
   }
   ```

2. **Error Responses**
   - **400 Bad Request**: Missing credentials
     - **Response Body**:
     ```json
     {
       "error": "Missing credentials",
       "message": "Both emailId and password are required."
     }
     ```

   - **404 Not Found**: User not found
     - **Response Body**:
     ```json
     {
       "error": "User not found",
       "message": "Invalid emailId or password."
     }
     ```

   - **401 Unauthorized**: Invalid credentials
     - **Response Body**:
     ```json
     {
       "error": "Unauthorized",
       "message": "Invalid emailId or password."
     }
     ```

   - **500 Internal Server Error**: Server error
     - **Response Body**:
     ```json
     {
       "error": "Server error",
       "message": "Detailed error message here."
     }
     ```

## Notes
- Ensure that the request body contains only the allowed fields.
- Passwords will be hashed before being stored in the database.
- A cookie named `token` will be set in the response, containing the JWT for the user session.
- Always handle errors gracefully on the frontend to provide a better user experience.