export interface UserModel {
    id?: number
    name: string
    username: string
    email: string
    password?: string
    confirmPassword?: string
    address?: string
    city?: string
    postalcode?: string
    mobilephone?: string
    photo?: string
    role_id?: number
}