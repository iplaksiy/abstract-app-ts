import { InstanceOptions, ModelInstance, ModelKeys, ModelType } from './models/model.register';
import { StorageResponse, Storage } from './storage/storage';

type CreateOptions<K extends ModelKeys> = {
  state: InstanceOptions<K>;
  saveToStorage?: true
}

export class App {
  public storage: Storage;
  
  constructor() { 
    this.storage = new Storage();
  }

  public create<K extends ModelKeys>(key: K, options: CreateOptions<K>): ModelInstance<K> | Promise<ModelInstance<K>> {
    if (!options.state.id) {
      options.state.id = this.storage.generateId();
    }

    const model = new ModelType[key](options.state) as ModelInstance<K>;

    if (options.saveToStorage) {
      this.storage.save(model).then((response: StorageResponse) => {
        return model;
      });
    }

    return model;
  }

  public async get<K extends ModelKeys>(key: K, id: string): Promise<ModelInstance<K> | null> {
    return this.storage.get(key, id);
  }

  public async update<K extends ModelKeys>(model: ModelInstance<K>): Promise<StorageResponse> {
    return this.storage.update(model);
  }

  public async delete<K extends ModelKeys>(key: K, id: string): Promise<StorageResponse> {
    return this.storage.delete(key, id);
  }
}
