# Project Title: Abstract Model App

## Project Description

This project is a TypeScript-based application that provides a framework for creating, updating, retrieving, and deleting model instances using different storage strategies. The project demonstrates an abstract model implementation, user model creation, and operations with various storage strategies such as In-Memory, Local Storage, and IndexedDB.

## File Structure

- **app.ts**: Main application logic to create, retrieve, update, and delete model instances.
- **main.ts**: Entry point of the application, demonstrating usage of the App class.
- **models/**: Contains abstract model definitions and specific model implementations.
  - **abstract.model.ts**: Abstract model class with common functionality for all models.
  - **user.model.ts**: User model extending the abstract model.
  - **model.register.ts**: Registry of all model types and their respective options and collection paths.
- **storage/**: Storage strategy implementations.
  - **storage.strategy.ts**: Interface for storage strategies.
  - **in-memory.strategy.ts**: In-Memory storage strategy implementation.
  - **local-storage.strategy.ts**: Local Storage strategy implementation.
  - **idb.strategy.ts**: IndexedDB storage strategy implementation.
  - **storage.ts**: Storage class handling the selection and usage of storage strategies.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or above)
- npm (version 6 or above)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repository/abstract-model-app.git
2. Navigate to the project directory:
   ```sh
   cd abstract-model-app
3. Install the dependencies:
    ```sh
   npm install

### Configuration

- Ensure you have the necessary TypeScript and Node.js setup.
- You can adjust the storage strategy by modifying the `setStrategy` method call in `app.ts`.

### VSCode Tasks Configuration

- Include the following tasks configuration in your `.vscode/tasks.json` file to build and run the project:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build and Run",
      "type": "shell",
      "command": "npx tsc && node dist/main.js",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "problemMatcher": ["$tsc"],
      "detail": "Compiles the TypeScript files and runs the compiled JavaScript code"
    }
  ]
}
```

### Running the Application

1. Open the project in VSCode.
2. Open the terminal in VSCode and run the following command to compile TypeScript files:
    ```sh
    npx tsc
3.	Execute the compiled JavaScript file:
    ```sh
    node dist/main.js

4. Alternatively, use the VSCode task:
   - Open the Command Palette (`Ctrl+Shift+P`).
   - Select `Tasks: Run Task`.
   - Choose `Build and Run`.

### Testing the Application

- The application logs operations in the console. Run the application using the instructions above and check the console output for verification of model operations (create, retrieve, update, delete).

## Usage

- **Creating a User**: The application generates a UUID for the user, creates a user instance, and saves it to the storage.
- **Retrieving a User**: The user is retrieved using its UUID.
- **Updating a User**: The user's details are updated and saved back to the storage.
- **Deleting a User**: The user is deleted from the storage.

### Example Code

The following example demonstrates the basic usage of the App class:

```ts
import { App } from './app';
import { UserOptions } from './models/user.model';

const app = new App();

// Create a user
const userOptions: UserOptions = {
    id: app.generateUUID(),
    name: 'John Doe',
    email: 'john.doe@example.com'
};

async function run() {
    // Create and save a user
    const user = await app.create('User', { state: userOptions, saveToStorage: true });
    console.log('User created:', user);

    // Retrieve the user
    const retrievedUser = await app.get('User', userOptions.id);
    console.log('User retrieved:', retrievedUser);

    // Update the user
    if (retrievedUser) {
        retrievedUser.name = 'Jane Doe';
        await app.update(retrievedUser);
        console.log('User updated:', retrievedUser);
    }

    // Retrieve the updated user
    const updatedUser = await app.get('User', userOptions.id);
    console.log('Updated user retrieved:', updatedUser);

    // Delete the user
    await app.delete('User', userOptions.id);
    console.log('User deleted');

    // Try to retrieve the deleted user
    const deletedUser = await app.get('User', userOptions.id);
    console.log('Deleted user retrieved:', deletedUser);
}

run();
```
## Contribution
Feel free to open issues or submit pull requests for improvements and bug fixes.
## License
This project is licensed under the MIT License.