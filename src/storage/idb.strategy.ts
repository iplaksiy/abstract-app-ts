import { ModelInstance, ModelKeyToCollectionKey, ModelKeys, ModelType } from "../models/model.register";
import { StorageStrategy, StorageStrategyResponse } from "./storage.strategy";

export class IDBStrategy implements StorageStrategy {
    private dbPromise: Promise<IDBDatabase>;

    constructor(private dbName: string) {
        this.dbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName);

            request.onupgradeneeded = event => {
                const db = (event.target as IDBOpenDBRequest).result;

                for (const key in ModelKeyToCollectionKey) {
                    const collection = ModelKeyToCollectionKey[key as ModelKeys];

                    if (!db.objectStoreNames.contains(collection)) {
                        db.createObjectStore(collection, {keyPath: 'id'});
                    }
                }
            };

            request.onsuccess = event => resolve((event.target as IDBOpenDBRequest).result);
            request.onerror = event => reject((event.target as IDBOpenDBRequest).error);
        });
    }

    public async save(collection: string, key: string, data: string): Promise<StorageStrategyResponse> {
        const db = await this.dbPromise;
        const transaction = db.transaction(collection, 'readwrite');
        const store = transaction.objectStore(collection);
        const dataObj = JSON.parse(data);
        const request = store.put(dataObj);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve({message: 'Obj saved successfully!'});
            transaction.onerror = event => reject((event.target as IDBRequest).error);
        });
    }

    public async get<K extends ModelKeys>(modelType: K, collection: string, key: string): Promise<ModelInstance<K> | null> {
        const db = await this.dbPromise;
        const transaction = db.transaction(collection, 'readonly');
        const store = transaction.objectStore(collection);
        const request = store.get(key);

        const data = await new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    
        if (typeof data === 'object' || data === null) {
            return this.deserialize(modelType, JSON.stringify(data));
        }
        
        throw new Error('Unexpected data type');
    }

    public async update(collection: string, key: string, data: string): Promise<StorageStrategyResponse> {
        const db = await this.dbPromise;
        const transaction = db.transaction(collection, 'readwrite');
        const store = transaction.objectStore(collection);
        const dataObj = JSON.parse(data);
        const request = store.put(dataObj);
        return new Promise((resolve, reject) => {
          transaction.oncomplete = () => resolve({message: 'Object updated successfully!'});
          transaction.onerror = event => reject((event.target as IDBRequest).error);
        });
    }      

    public async delete(collection: string, key: string): Promise<StorageStrategyResponse> {
        const db = await this.dbPromise;
        const transaction = db.transaction(collection, 'readwrite');
        const store = transaction.objectStore(collection);
        const request = store.delete(key);
    
        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve({message: 'Object deleted successfully!'});
            transaction.onerror = event => reject((event.target as IDBRequest).error);
        });
    }

    public async deserialize<K extends ModelKeys>(modelType: K, data: string | null): Promise<ModelInstance<K> | null> {
        if (data === null) {
            return null;
        }
    
        const dataObj = JSON.parse(data);
        const instance = new ModelType[modelType](dataObj);
        return instance as ModelInstance<K>;
    }    
}
