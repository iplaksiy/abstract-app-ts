export interface Transformable {
    deserialize(obj: unknown): this;
    serialize(): any;
}

export interface ValidatableModel extends Transformable {
    validateOptions(options: any): void;
}

export abstract class AbstractModel implements ValidatableModel {
    public abstract id: string;
    public createdOn?: number;
    public updatedOn?: number;
    public updatedBy?: string;

    constructor(options: {id: string; [key: string]: any}) {
        this.validateOptions(options);
        Object.assign(this, options);
        this.createdOn = this.getTime();
    }
    
    public validateOptions(options: { id: string; [key: string]: any }): void {
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