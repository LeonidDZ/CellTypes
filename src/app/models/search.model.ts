export class SearchModel {
    constructor(
        public cellName: string,
        public cellType: string,
        public maxLength: number,
        public required: boolean
    ) {
        this.cellName = cellName;
        this.cellType = cellType;
        this.maxLength = maxLength;
        this.required = required;
    }
}