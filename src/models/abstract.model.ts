import { v4 as uuidv4 } from 'uuid';

export abstract class AbstractModel {
    public id: string;
    public createdOn: number;
    public updatedOn?: number;
    public updatedBy?: string;

    constructor(options: { id?: string; createdOn?: number; updatedOn?: number; updatedBy?: string; [key: string]: any }) {
        this.id = options.id || uuidv4();
        this.createdOn = options.createdOn || this.getTime();
        this.validateOptions(options);
        Object.assign(this, options);
    }
    
    public validateOptions(options: { id?: string; [key: string]: any }): void {
        if (!options.id) {
            throw new Error("Invalid options: id is required");
        }
    }

    public deserialize(obj: unknown): this {
        Object.assign(this, obj);
        return this;
    }

    public serialize(): any {
        return JSON.stringify(this);
    }

    public update(updatedBy?: string): this {
        this.updatedOn = this.getTime();

        if (updatedBy) {
            this.updatedBy = updatedBy;
        }
        
        return this;
    };

    private getTime(): number {
        return new Date().getTime();
    }
}