import { User, UserOptions } from "./user.model";

export const ModelType = {
    User: User
} as const;

export const CollectionPath = {
    User: 'users'
} as const;

export const ModelKeyToCollectionKey = {
    User: 'users'
} as const;

export type ModelOptionsTypes = {
    User: UserOptions
}

export type ModelKeys = keyof typeof ModelType;
export type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
export type ModelInstance<K extends ModelKeys> = InstanceType<typeof ModelType[K]>;

export type InstanceOptions<K extends ModelKeys> = 
    K extends 'User' ? UserOptions : 
    {id: string; }