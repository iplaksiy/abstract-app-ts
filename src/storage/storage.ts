import { v4 as uuidv4 } from 'uuid';
import { StorageStrategyResponse, StorageStrategy } from "./storage.strategy";
import { ModelInstance, ModelKeyToCollectionKey, ModelKeys } from "../models/model.register";
import { IDBStrategy } from "./idb.strategy";
import { InMemoryStorageStrategy } from "./in-memory.strategy";
import { LocalStorageStrategy } from "./local-storage.strategy";

export type StorageResponse = StorageStrategyResponse;

export class Storage {
    
    private strategy: StorageStrategy;
    private dbName: string = 'abstract-app-db';

    constructor() {
        this.strategy = new InMemoryStorageStrategy();
    }

    public async save<K extends ModelKeys>(model: ModelInstance<K>): Promise<StorageResponse> {
        const key = model.id;
        const data = model.serialize();
        const collection = ModelKeyToCollectionKey[model.constructor.name as K];

        await this.strategy.save(collection,key, data);
        return {message: 'Obj saved successfully!'};
    }

    public async get<K extends ModelKeys>(modelType: K, id: string): Promise<ModelInstance<K> | null> {
        const collection = ModelKeyToCollectionKey[modelType as keyof typeof ModelKeyToCollectionKey];
        return this.strategy.get(modelType, collection, id);
    }

    public async update<K extends ModelKeys>(model: ModelInstance<K>): Promise<StorageResponse> {
        const key = model.id;
        const data = model.update().serialize();
        const collection = ModelKeyToCollectionKey[model.constructor.name as K];
        await this.strategy.update(collection, key, data);
        return {message: 'Object updated successfully!'};
    }      

    public async delete<K extends ModelKeys>(modelType: K, id: string): Promise<StorageResponse> {
        const collection = ModelKeyToCollectionKey[modelType as keyof typeof ModelKeyToCollectionKey];
        return this.strategy.delete(collection, id);
    }

    public setStrategy(strategy: StorageStrategy): void {
        if (strategy instanceof IDBStrategy) {
            this.strategy = new IDBStrategy(this.dbName);
        } else if (strategy instanceof LocalStorageStrategy) {
            this.strategy = new LocalStorageStrategy();
        } else {
            this.strategy = strategy;
        }
    }

    public generateId(): string {
        return this.strategy.generateId ? this.strategy.generateId() : uuidv4();
    }
}
