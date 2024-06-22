import { AbstractModel } from "./abstract.model";

export type UserOptions = {
    id?: string;
    name: string;
    email: string;
    createdOn?: number;
}

export class User extends AbstractModel {
    public name: string = '';
    public email: string = '';

    constructor(options?: UserOptions) {
        super(options || { name: '' });
        this.name = options ? options.name : '';
        this.email = options ? options.email : '';
    }

    public override validateOptions(options: UserOptions): void {
        super.validateOptions(options);

        if (!options.name) {
            throw new Error("Invalid options: name is required for User");
        }
    }

    public override deserialize(obj: string): this {
        const data: UserOptions = JSON.parse(obj);
        this.validateOptions(data);
        Object.assign(this, data);
        return this;
    }
}
