/** TODO элемент */
export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

/** Информация о запросе */
export interface TodosResponceInfo {
    total: number;
    skip: number;
    limit: number;
}

/** Ответ API */
export interface TodosResponse extends TodosResponceInfo {
    todos: Todo[];
}

/** Параметры запроса TODO */
export interface TodosRequest {
    limit: number
    skip: number
}
