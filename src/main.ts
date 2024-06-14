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