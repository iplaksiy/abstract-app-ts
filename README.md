# Project Title: Abstract Model App

## Project Description

This project is a TypeScript-based application that provides a framework for creating, updating, retrieving, and deleting model instances using different storage strategies. The project demonstrates an abstract model implementation, user model creation, and operations with various storage strategies such as In-Memory, Local Storage, and IndexedDB.

## Theoretical Approach and Scalability

### Overview

The abstract model approach used in this project provides a robust framework for managing various types of data models with a consistent API for creating, retrieving, updating, and deleting instances. This approach is designed to be highly scalable and adaptable to new requirements, making it an excellent choice for complex applications that need to manage diverse types of data.

### Benefits of the Abstract Model Approach

1. **Modularity and Extensibility**:
    - **Modular Design**: The abstract model and the strategy pattern used for storage strategies enable the application to be easily extended with new models and storage mechanisms. Each model and storage strategy is encapsulated in its module, promoting clean separation of concerns.
    - **Easy Addition of New Models**: Introducing a new model involves defining the model class, adding it to the model registry, and creating the necessary storage handling logic. This modular approach ensures that changes in one part of the system do not affect others, making the application easier to maintain and extend.

2. **Consistent API**:
    - **Unified Interface**: The application provides a unified interface for all CRUD operations regardless of the underlying model or storage strategy. This consistency simplifies the codebase and reduces the learning curve for developers.

3. **Scalability**:
    - **Horizontal Scaling**: The abstract model approach facilitates horizontal scaling. As the application grows, new models can be introduced without significant refactoring. The system can handle an increasing number of models and storage strategies by simply adding new modules.
    - **Adaptability**: The ability to switch storage strategies (e.g., from in-memory to IndexedDB or local storage) by changing the strategy configuration enhances the application's scalability. This adaptability ensures that the application can scale with varying performance and storage requirements.

4. **Testability**:
    - **Isolated Testing**: Each model and storage strategy can be tested in isolation, ensuring that the system's components function correctly before integration. This isolation simplifies unit testing and improves test coverage.

### Implementation Details

- **Model Definition**: Models are defined by extending the abstract model class, ensuring that they inherit common functionality such as serialization, deserialization, and validation.
- **Storage Strategies**: The application supports multiple storage strategies (In-Memory, Local Storage, IndexedDB) implemented using the strategy pattern. This design allows the application to switch storage backends without modifying the core logic.
- **Model Registry**: The `model.register.ts` file maintains a registry of all model types and their respective options and collection paths. This registry ensures that new models are easily integrated into the existing framework.

### Scaling with New Models

When introducing new models, the following steps are typically followed:

1. **Define the Model**: Create a new class for the model, extending the abstract model class. Implement specific methods and properties required for the model.
2. **Register the Model**: Add the new model to the model registry in `model.register.ts`, defining its type, options, and collection path.
3. **Storage Handling**: Ensure that the storage strategies can handle the new model. This might involve adding logic to deserialize and manage the new model in the chosen storage backend.
4. **Integrate with Application Logic**: Update the application logic to create, retrieve, update, and delete instances of the new model using the unified API provided by the `App` class.

### Conclusion

The abstract model approach combined with the strategy pattern for storage provides a scalable and adaptable framework for managing diverse data models in a TypeScript application. This design enhances modularity, maintainability, and scalability, making it suitable for applications that need to evolve over time with changing data management requirements.

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