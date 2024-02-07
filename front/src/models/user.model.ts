export interface User {
    name: string
    email: string
}

export const factoryUser = (name: string, email: string): User => {
    return {
        name,
        email
    }
}