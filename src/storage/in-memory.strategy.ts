import { ModelInstance, ModelKeys, ModelType } from "../models/model.register";
import { StorageStrategyResponse, StorageStrategy } from "./storage.strategy";

export class InMemoryStorageStrategy implements StorageStrategy {
    private storage: { [collection: string]: { [key: string]: string } } = {};

    public async save(collection: string, key: string, data: string): Promise<StorageStrategyResponse> {
        if (!this.storage[collection]) {
            this.storage[collection] = {};
        }
        this.storage[collection][key] = data;
        return { message: 'Obj saved successfully!' };
    }

    public async get<K extends ModelKeys>(modelType: K, collection: string, key: string): Promise<ModelInstance<K> | null> {
        const data = this.storage[collection]?.[key] || null;
        return this.deserialize(modelType, data);
    }

    public async update(collection: string, key: string, data: string): Promise<StorageStrategyResponse> {
        if (!this.storage[collection]) {
            this.storage[collection] = {};
        }
        this.storage[collection][key] = data;
        return { message: 'Object updated successfully!' };
    }

    public async delete(collection: string, key: string): Promise<StorageStrategyResponse> {
        if (this.storage[collection]) {
            delete this.storage[collection][key];
        }
        return { message: 'Object deleted successfully!' };
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