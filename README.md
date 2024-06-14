# Abstract Model App

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

## Theoretical Approach and Scalability

### Overview

The abstract model approach used in this project provides a robust framework for managing various types of data models with a consistent API for creating, retrieving, updating, and deleting instances. This approach is designed to be highly scalable and adaptable to new requirements, making it an excellent choice for complex applications that need to manage diverse types of data.

### Benefits of the Abstract Model Approach

1. **Modularity and Extensibility**:
    - **Modular Design**: The abstract model and the strategy pattern used for storage strategies enable the application to be easily extended with new models and storage mechanisms. Each model and storage strategy is encapsulated in its module, promoting clean separation of concerns.
    - **Easy Addition of New Models**: Introducing a new model involves defining the model class, adding it to the model registry, and creating the necessary storage handling logic. This modular approach ensures that changes in one part of the system do not affect others, making the application easier to maintain and extend.

2. **Consistent API**:
    - **Unified Interface**: The application provides a unified interface for all CRUD operations regardless of the underlying model or storage strategy. This consistency simplifies the codebase and reduces the learning curve for developers.
    - **Global Access via the App Class**: The `App` class acts as a central hub for managing all models and storage operations. This global access simplifies interactions with models across the application, providing a single point of entry for model operations.

3. **Scalability**:
    - **Horizontal Scaling**: The abstract model approach facilitates horizontal scaling. As the application grows, new models can be introduced without significant refactoring. The system can handle an increasing number of models and storage strategies by simply adding new modules.
    - **Adaptability**: The ability to switch storage strategies (e.g., from in-memory to IndexedDB or local storage) by changing the strategy configuration enhances the application's scalability. This adaptability ensures that the application can scale with varying performance and storage requirements.

4. **Type Safety and Inference**:
    - **Type Inference**: TypeScript's type inference ensures that model instances are correctly typed throughout the application. Developers do not need to explicitly define types when working with models, reducing boilerplate code and minimizing the risk of type errors.
    - **Compile-Time Safety**: By leveraging TypeScript's static type checking, the application can catch potential errors at compile time, leading to more robust and reliable code.

5. **Testability**:
    - **Isolated Testing**: Each model and storage strategy can be tested in isolation, ensuring that the system's components function correctly before integration. This isolation simplifies unit testing and improves test coverage.

### Implementation Details

- **Model Definition**: Models are defined by extending the abstract model class, ensuring that they inherit common functionality such as serialization, deserialization, and validation.
- **Storage Strategies**: The application supports multiple storage strategies (In-Memory, Local Storage, IndexedDB) implemented using the strategy pattern. This design allows the application to switch storage backends without modifying the core logic.
- **Model Registry**: The `model.register.ts` file maintains a registry of all model types and their respective options and collection paths. This registry ensures that new models are easily integrated into the existing framework.
- **Type Inference**: The `ModelType`, `ModelKeys`, and `InstanceOptions` types in `model.register.ts` enable TypeScript to infer types for model instances, ensuring type safety without requiring explicit type definitions in the application logic.

### Scaling with New Models

When introducing new models, the following steps are typically followed:

1. **Define the Model**: Create a new class for the model, extending the abstract model class. Implement specific methods and properties required for the model.
2. **Register the Model**: Add the new model to the model registry in `model.register.ts`, defining its type, options, and collection path.
3. **Storage Handling**: Ensure that the storage strategies can handle the new model. This might involve adding logic to deserialize and manage the new model in the chosen storage backend.
4. **Integrate with Application Logic**: Update the application logic to create, retrieve, update, and delete instances of the new model using the unified API provided by the `App` class.

### Use Cases

The abstract model approach is versatile and can be applied to a wide range of applications, including but not limited to:

1. **Content Management Systems (CMS)**:
    - Manage various types of content such as articles, blogs, images, and videos.
    - Easily introduce new content types and storage backends as needed.

    **New Model**: `Article`
    
    This example demonstrates how to create an `Article` model to manage content types like articles in a CMS. The model includes properties such as `title`, `content`, `author`, and `publishedDate`. It is registered in the model registry and integrated with the storage handling logic.

    #### models/article.model.ts

    ```typescript
    import { AbstractModel } from "./abstract.model";

    export type ArticleOptions = {
        id: string;
        title: string;
        content: string;
        author: string;
        publishedDate: string;
    }

    export class Article extends AbstractModel {
        public id: string = '';
        public title: string = '';
        public content: string = '';
        public author: string = '';
        public publishedDate: string = '';

        constructor(options?: ArticleOptions) {
            super(options || {id: '', title: '', content: '', author: '', publishedDate: ''});
            this.id = options ? options.id : '';
            this.title = options ? options.title : '';
            this.content = options ? options.content : '';
            this.author = options ? options.author : '';
            this.publishedDate = options ? options.publishedDate : '';
        }

        public override validateOptions(options: ArticleOptions): void {
            super.validateOptions(options);
            if (!options.title || !options.content || !options.author || !options.publishedDate) {
                throw new Error("Invalid options: all fields are required for Article");
            }
        }
    }
    ```

    #### models/model.register.ts

    ```typescript
    import { User, UserOptions } from "./user.model";
    import { Article, ArticleOptions } from "./article.model";

    export const ModelType = {
        User: User,
        Article: Article
    } as const;

    export const CollectionPath = {
        User: 'users',
        Article: 'articles'
    } as const;

    export const ModelKeyToCollectionKey = {
        User: 'users',
        Article: 'articles'
    } as const;

    export type ModelOptionsTypes = {
        User: UserOptions,
        Article: ArticleOptions
    }

    export type ModelKeys = keyof typeof ModelType;
    export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
    export type ModelInstance<K extends ModelKeys> = InstanceType<typeof ModelType[K]>;

    export type InstanceOptions<K extends ModelKeys> = 
        K extends 'User' ? UserOptions : 
        K extends 'Article' ? ArticleOptions :
        {id: string; }
    ```

2. **E-commerce Platforms**:
    - Handle different entities like products, orders, customers, and reviews.
    - Scale with increasing product types and customer data by adding new models and optimizing storage strategies.

    **New Model**: `Product`
    
    This example demonstrates how to create a `Product` model to manage entities like products in an e-commerce platform. The model includes properties such as `name`, `description`, `price`, and `category`. It is registered in the model registry and integrated with the storage handling logic.

    #### models/product.model.ts

    ```typescript
    import { AbstractModel } from "./abstract.model";

    export type ProductOptions = {
        id: string;
        name: string;
        description: string;
        price: number;
        category: string;
    }

    export class Product extends AbstractModel {
        public id: string = '';
        public name: string = '';
        public description: string = '';
        public price: number = 0;
        public category: string = '';

        constructor(options?: ProductOptions) {
            super(options || {id: '', name: '', description: '', price: 0, category: ''});
            this.id = options ? options.id : '';
            this.name = options ? options.name : '';
            this.description = options ? options.description : '';
            this.price = options ? options.price : 0;
            this.category = options ? options.category : '';
        }

        public override validateOptions(options: ProductOptions): void {
            super.validateOptions(options);
            if (!options.name || !options.description || !options.price || !options.category) {
                throw new Error("Invalid options: all fields are required for Product");
            }
        }
    }
    ```

    #### models/model.register.ts

    ```typescript
    import { User, UserOptions } from "./user.model";
    import { Product, ProductOptions } from "./product.model";

    export const ModelType = {
        User: User,
        Product: Product
    } as const;

    export const CollectionPath = {
        User: 'users',
        Product: 'products'
    } as const;

    export const ModelKeyToCollectionKey = {
        User: 'users',
        Product: 'products'
    } as const;

    export type ModelOptionsTypes = {
        User: UserOptions,
        Product: ProductOptions
    }

    export type ModelKeys = keyof typeof ModelType;
    export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
    export type ModelInstance<K extends ModelKeys> = InstanceType<typeof ModelType[K]>;

    export type InstanceOptions<K extends ModelKeys> = 
        K extends 'User' ? UserOptions : 
        K extends 'Product' ? ProductOptions :
        {id: string; }
    ```

3. **Customer Relationship Management (CRM) Systems**:
    - Manage customer data, interactions, and support tickets.
    - Extend the system with new models for campaigns, leads, and sales pipelines.

    **New Model**: `Lead`
    
    This example demonstrates how to create a `Lead` model to manage entities like leads in a CRM system. The model includes properties such as `name`, `contactInfo`, `status`, and `notes`. It is registered in the model registry and integrated with the storage handling logic.

    #### models/lead.model.ts

    ```typescript
    import { AbstractModel } from "./abstract.model";

    export type LeadOptions = {
        id: string;
        name: string;
        contactInfo: string;
        status: string;
        notes?: string;
    }

    export class Lead extends AbstractModel {
        public id: string = '';
        public name: string = '';
        public contactInfo: string = '';
        public status: string = '';
        public notes?: string = '';

        constructor(options?: LeadOptions) {
            super(options || {id: '', name: '', contactInfo: '', status: ''});
            this.id = options ? options.id : '';
            this.name = options ? options.name : '';
            this.contactInfo = options ? options.contactInfo : '';
            this.status = options ? options.status : '';
            this.notes = options ? options.notes : '';
        }

        public override validateOptions(options: LeadOptions): void {
            super.validateOptions(options);
            if (!options.name || !options.contactInfo || !options.status) {
                throw new Error("Invalid options: name, contactInfo, and status are required for Lead");
            }
        }
    }
    ```

    #### models/model.register.ts

    ```typescript
    import { User, UserOptions } from "./user.model";
    import { Lead, LeadOptions } from "./lead.model";

    export const ModelType = {
        User: User,
        Lead: Lead
    } as const;

    export const CollectionPath = {
        User: 'users',
        Lead: 'leads'
    } as const;

    export const ModelKeyToCollectionKey = {
        User: 'users',
        Lead: 'leads'
    } as const;

    export type ModelOptionsTypes = {
        User: UserOptions,
        Lead: LeadOptions
    }

    export type ModelKeys = keyof typeof ModelType;
    export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
    export type ModelInstance<K extends ModelKeys> = InstanceType<typeof ModelType[K]>;

    export type InstanceOptions<K extends ModelKeys> = 
        K extends 'User' ? UserOptions : 
        K extends 'Lead' ? LeadOptions :
        {id: string; }
    ```

4. **Social Media Applications**:
    - Manage user profiles, posts, comments, and messages.
    - Adapt to new features like stories, reels, and live streams by introducing new models.

    **New Model**: `Post`
    
    This example demonstrates how to create a `Post` model to manage entities like posts in a social media application. The model includes properties such as `content`, `author`, `timestamp`, and `likes`. It is registered in the model registry and integrated with the storage handling logic.

    #### models/post.model.ts

    ```typescript
    import { AbstractModel } from "./abstract.model";

    export type PostOptions = {
        id: string;
        content: string;
        author: string;
        timestamp: string;
        likes: number;
    }

    export class Post extends AbstractModel {
        public id: string = '';
        public content: string = '';
        public author: string = '';
        public timestamp: string = '';
        public likes: number = 0;

        constructor(options?: PostOptions) {
            super(options || {id: '', content: '', author: '', timestamp: '', likes: 0});
            this.id = options ? options.id : '';
            this.content = options ? options.content : '';
            this.author = options ? options.author : '';
            this.timestamp = options ? options.timestamp : '';
            this.likes = options ? options.likes : 0;
        }

        public override validateOptions(options: PostOptions): void {
            super.validateOptions(options);
            if (!options.content || !options.author || !options.timestamp) {
                throw new Error("Invalid options: content, author, and timestamp are required for Post");
            }
        }
    }
    ```

    #### models/model.register.ts

    ```typescript
    import { User, UserOptions } from "./user.model";
    import { Post, PostOptions } from "./post.model";

    export const ModelType = {
        User: User,
        Post: Post
    } as const;

    export const CollectionPath = {
        User: 'users',
        Post: 'posts'
    } as const;

    export const ModelKeyToCollectionKey = {
        User: 'users',
        Post: 'posts'
    } as const;

    export type ModelOptionsTypes = {
        User: UserOptions,
        Post: PostOptions
    }

    export type ModelKeys = keyof typeof ModelType;
    export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
    export type ModelInstance<K extends ModelKeys> = InstanceType<typeof ModelType[K]>;

    export type InstanceOptions<K extends ModelKeys> = 
        K extends 'User' ? UserOptions : 
        K extends 'Post' ? PostOptions :
        {id: string; }
    ```

5. **Healthcare Management Systems**:
    - Handle patient records, appointments, prescriptions, and medical history.
    - Add new models for lab results, billing, and insurance information.

    **New Model**: `PatientRecord`
    
    This example demonstrates how to create a `PatientRecord` model to manage entities like patient records in a healthcare management system. The model includes properties such as `patientId`, `name`, `medicalHistory`, and `appointments`. It is registered in the model registry and integrated with the storage handling logic.

    #### models/patientRecord.model.ts

    ```typescript
    import { AbstractModel } from "./abstract.model";

    export type PatientRecordOptions = {
        id: string;
        patientId: string;
        name: string;
        medicalHistory: string;
        appointments: string[];
    }

    export class PatientRecord extends AbstractModel {
        public id: string = '';
        public patientId: string = '';
        public name: string = '';
        public medicalHistory: string = '';
        public appointments: string[] = [];

        constructor(options?: PatientRecordOptions) {
            super(options || {id: '', patientId: '', name: '', medicalHistory: '', appointments: []});
            this.id = options ? options.id : '';
            this.patientId = options ? options.patientId : '';
            this.name = options ? options.name : '';
            this.medicalHistory = options ? options.medicalHistory : '';
            this.appointments = options ? options.appointments : [];
        }

        public override validateOptions(options: PatientRecordOptions): void {
            super.validateOptions(options);
            if (!options.patientId || !options.name || !options.medicalHistory) {
                throw new Error("Invalid options: patientId, name, and medicalHistory are required for PatientRecord");
            }
        }
    }
    ```

    #### models/model.register.ts

    ```typescript
    import { User, UserOptions } from "./user.model";
    import { PatientRecord, PatientRecordOptions } from "./patientRecord.model";

    export const ModelType = {
        User: User,
        PatientRecord: PatientRecord
    } as const;

    export const CollectionPath = {
        User: 'users',
        PatientRecord: 'patientRecords'
    } as const;

    export const ModelKeyToCollectionKey = {
        User: 'users',
        PatientRecord: 'patientRecords'
    } as const;

    export type ModelOptionsTypes = {
        User: UserOptions,
        PatientRecord: PatientRecordOptions
    }

    export type ModelKeys = keyof typeof ModelType;
    export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
    export type ModelInstance<K extends ModelKeys> = InstanceType<typeof ModelType[K]>;

    export type InstanceOptions<K extends ModelKeys> = 
        K extends 'User' ? UserOptions : 
        K extends 'PatientRecord' ? PatientRecordOptions :
        {id: string; }
    ```

6. **Project Management Tools**:
    - Manage projects, tasks, timelines, and team members.
    - Scale to include additional features like resource management and time tracking with new models.

    **New Model**: `Project`
    
    This example demonstrates how to create a `Project` model to manage entities like projects in a project management tool. The model includes properties such as `name`, `description`, `startDate`, `endDate`, and `tasks`. It is registered in the model registry and integrated with the storage handling logic.

    #### models/project.model.ts

    ```typescript
    import { AbstractModel } from "./abstract.model";

    export type ProjectOptions = {
        id: string;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        tasks: string[];
    }

    export class Project extends AbstractModel {
        public id: string = '';
        public name: string = '';
        public description: string = '';
        public startDate: string = '';
        public endDate: string = '';
        public tasks: string[] = [];

        constructor(options?: ProjectOptions) {
            super(options || {id: '', name: '', description: '', startDate: '', endDate: '', tasks: []});
            this.id = options ? options.id : '';
            this.name = options ? options.name : '';
            this.description = options ? options.description : '';
            this.startDate = options ? options.startDate : '';
            this.endDate = options ? options.endDate : '';
            this.tasks = options ? options.tasks : [];
        }

        public override validateOptions(options: ProjectOptions): void {
            super.validateOptions(options);
            if (!options.name || !options.description || !options.startDate || !options.endDate) {
                throw new Error("Invalid options: name, description, startDate, and endDate are required for Project");
            }
        }
    }
    ```

    #### models/model.register.ts

    ```typescript
    import { User, UserOptions } from "./user.model";
    import { Project, ProjectOptions } from "./project.model";

    export const ModelType = {
        User: User,
        Project: Project
    } as const;

    export const CollectionPath = {
        User: 'users',
        Project: 'projects'
    } as const;

    export const ModelKeyToCollectionKey = {
        User: 'users',
        Project: 'projects'
    } as const;

    export type ModelOptionsTypes = {
        User: UserOptions,
        Project: ProjectOptions
    }

    export type ModelKeys = keyof typeof ModelType;
    export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
    export type ModelInstance<K extends ModelKeys> = InstanceType<typeof ModelType[K]>;

    export type InstanceOptions<K extends ModelKeys> = 
        K extends 'User' ? UserOptions : 
        K extends 'Project' ? ProjectOptions :
        {id: string; }
    ```

7. **Inventory Management Systems**:
    - Manage inventory, suppliers, and stock levels.
    - Add new models for purchase orders, stock movements, and supplier management.

    **New Model**: `InventoryItem`
    
    This example demonstrates how to create an `InventoryItem` model to manage entities like inventory items in an inventory management system. The model includes properties such as `itemName`, `quantity`, `location`, and `supplier`. It is registered in the model registry and integrated with the storage handling logic.

    #### models/inventoryItem.model.ts

    ```typescript
    import { AbstractModel } from "./abstract.model";

    export type InventoryItemOptions = {
        id: string;
        itemName: string;
        quantity: number;
        location: string;
        supplier: string;
    }

    export class InventoryItem extends AbstractModel {
        public id: string = '';
        public itemName: string = '';
        public quantity: number = 0;
        public location: string = '';
        public supplier: string = '';

        constructor(options?: InventoryItemOptions) {
            super(options || {id: '', itemName: '', quantity: 0, location: '', supplier: ''});
            this.id = options ? options.id : '';
            this.itemName = options ? options.itemName : '';
            this.quantity = options ? options.quantity : 0;
            this.location = options ? options.location : '';
            this.supplier = options ? options.supplier : '';
        }

        public override validateOptions(options: InventoryItemOptions): void {
            super.validateOptions(options);
            if (!options.itemName || !options.quantity || !options.location || !options.supplier) {
                throw new Error("Invalid options: itemName, quantity, location, and supplier are required for InventoryItem");
            }
        }
    }
    ```

    #### models/model.register.ts

    ```typescript
    import { User, UserOptions } from "./user.model";
    import { InventoryItem, InventoryItemOptions } from "./inventoryItem.model";

    export const ModelType = {
        User: User,
        InventoryItem: InventoryItem
    } as const;

    export const CollectionPath = {
        User: 'users',
        InventoryItem: 'inventoryItems'
    } as const;

    export const ModelKeyToCollectionKey = {
        User: 'users',
        InventoryItem: 'inventoryItems'
    } as const;

    export type ModelOptionsTypes = {
        User: UserOptions,
        InventoryItem: InventoryItemOptions
    }

    export type ModelKeys = keyof typeof ModelType;
    export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
    export type ModelInstance<K extends ModelKeys> = InstanceType<typeof ModelType[K]>;

    export type InstanceOptions<K extends ModelKeys> = 
        K extends 'User' ? UserOptions : 
        K extends 'InventoryItem' ? InventoryItemOptions :
        {id: string; }
    ```

8. **Financial Management Systems**:
    - Manage financial records, transactions, and accounts.
    - Add new models for invoices, expenses, and budget planning.

    **New Model**: `Transaction`
    
    This example demonstrates how to create a `Transaction` model to manage entities like transactions in a financial management system. The model includes properties such as `amount`, `date`, `type`, and `description`. It is registered in the model registry and integrated with the storage handling logic.

    #### models/transaction.model.ts

    ```typescript
    import { AbstractModel } from "./abstract.model";

    export type TransactionOptions = {
        id: string;
        amount: number;
        date: string;
        type: string;
        description: string;
    }

    export class Transaction extends AbstractModel {
        public id: string = '';
        public amount: number = 0;
        public date: string = '';
        public type: string = '';
        public description: string = '';

        constructor(options?: TransactionOptions) {
            super(options || {id: '', amount: 0, date: '', type: '', description: ''});
            this.id = options ? options.id : '';
            this.amount = options ? options.amount : 0;
            this.date = options ? options.date : '';
            this.type = options ? options.type : '';
            this.description = options ? options.description : '';
        }

        public override validateOptions(options: TransactionOptions): void {
            super.validateOptions(options);
            if (!options.amount || !options.date || !options.type || !options.description) {
                throw new Error("Invalid options: amount, date, type, and description are required for Transaction");
            }
        }
    }
    ```

    #### models/model.register.ts

    ```typescript
    import { User, UserOptions } from "./user.model";
    import { Transaction, TransactionOptions } from "./transaction.model";

    export const ModelType = {
        User: User,
        Transaction: Transaction
    } as const;

    export const CollectionPath = {
        User: 'users',
        Transaction: 'transactions'
    } as const;

    export const ModelKeyToCollectionKey = {
        User: 'users',
        Transaction: 'transactions'
    } as const;

    export type ModelOptionsTypes = {
        User: UserOptions,
        Transaction: TransactionOptions
    }

    export type ModelKeys = keyof typeof ModelType;
    export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
    export type ModelInstance<K extends ModelKeys> = InstanceType<typeof ModelType[K]>;

    export type InstanceOptions<K extends ModelKeys> = 
        K extends 'User' ? UserOptions : 
        K extends 'Transaction' ? TransactionOptions :
        {id: string; }
    ```
### Conclusion

The abstract model approach combined with the strategy pattern for storage provides a scalable and adaptable framework for managing diverse data models in a TypeScript application. This design enhances modularity, maintainability, and scalability, making it suitable for applications that need to evolve over time with changing data management requirements. Additionally, the benefits of type inference and global access to models through the `App` class further streamline development and contribute to the overall scalability of the application.

## Contribution
Feel free to open issues or submit pull requests for improvements and bug fixes.
## License
This project is licensed under the MIT License.