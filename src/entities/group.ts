export class Group{
    constructor(
        public id?: number,
        public name?: string,
        public permissions: Array<string> =[]
    ) {}
}