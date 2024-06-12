export interface FilterOptions {
    text: string;
    selected: boolean;
    value: string;
}

export interface FilterData {
    title: string;
    options: FilterOptions[]
}

export interface IComment {
    id: string;
    comments: string[]
}