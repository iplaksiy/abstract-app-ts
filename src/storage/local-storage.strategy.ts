import { ModelInstance, ModelKeys, ModelType } from "../models/model.register";
import { StorageStrategyResponse, StorageStrategy } from "./storage.strategy";

export class LocalStorageStrategy implements StorageStrategy {
    public async save(collection: string, key: string, data: string): Promise<StorageStrategyResponse> {
        const storageKey = `${collection}/${key}`;
        localStorage.setItem(storageKey, data);
        return {message: 'Obj saved successfully!'};
    }

    public async get<K extends ModelKeys>(modelType: K, collection: string, key: string): Promise<ModelInstance<K> | null> {
        const storageKey = `${collection}/${key}`;
        const data = localStorage.getItem(storageKey);
        
        return this.deserialize(modelType, data);
    }

    public async update(collection: string, key: string, data: string): Promise<StorageStrategyResponse> {
        const storageKey = `${collection}/${key}`;
        localStorage.setItem(storageKey, data);
        return {message: 'Object updated successfully!'};
      }
      
    public async delete(collection: string, key: string): Promise<StorageStrategyResponse> {
        const storageKey = `${collection}/${key}`;
        localStorage.removeItem(storageKey);
        return {message: 'Object deleted successfully!'};
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