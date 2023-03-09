import { CategoryActionType, ICategoryItem } from "./types";

const initState: ICategoryItem[] = [];

export const CategoryReducer = (state = initState, action: any) => {
    switch(action.type) {
        case CategoryActionType.GET_CATEGORIES: {
            const payload : ICategoryItem[] = action.payload as [];
            return payload;
        }
    }
    return state;
}