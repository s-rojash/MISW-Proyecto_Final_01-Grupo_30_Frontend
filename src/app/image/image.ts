export class Image {
    source: string;
    altText: string;
    height: number;
    width: number;

    constructor(
        source: string,
        altText: string,
        height: number,
        width: number,
    ){
        this.source = source;
        this.altText = altText;
        this.height = height;
        this.width = width;
    }
}
