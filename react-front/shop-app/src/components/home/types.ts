export interface ICategoryItem {
    id: number;
    name: string;
    imagePath: string;
}

export enum CategoryActionType {
    GET_CATEGORIES = "GET_CATEGORIES_ACTION"
}