import { ModelInstance, ModelKeys } from "../models/model.register";

export type StorageStrategyResponse = {
    message: string;
}

export abstract class StorageStrategy {
    public abstract save(collection: string, key: string, data: string): Promise<StorageStrategyResponse>;
    public abstract get<K extends ModelKeys>(modelType: K, collection: string, key: string): Promise<ModelInstance<K> | null>;
    public abstract update(collection: string, key: string, data: string): Promise<StorageStrategyResponse>;
    public abstract delete(collection: string, key: string): Promise<StorageStrategyResponse>;
    public abstract deserialize<K extends ModelKeys>(modelType: K, data: string | null): Promise<ModelInstance<K> | null>;
}