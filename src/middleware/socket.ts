// IN CASE WE NEED IT.
export const socketMiddleware = (s: any) => (next: any) => (action: any) => {
    next(action);
}