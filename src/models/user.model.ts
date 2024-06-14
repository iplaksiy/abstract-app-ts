import { AbstractModel } from "./abstract.model";

export type UserOptions = {
    id: string;
    name: string;
    email?: string;
}

export class User extends AbstractModel {
    public id: string = '';
    public name: string = '';


    constructor (options?: UserOptions) {
        super(options || {id: '', name: ''});
        this.id = options ? options.id : '';
        this.name = options ? options.name : '';   }

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
