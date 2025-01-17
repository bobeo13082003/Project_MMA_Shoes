export { }

declare global {
    interface IBackendRes<T> {
        error: string | string[],
        data?: T,
        message: string,
    }

    interface IRegister {
        userId: string
        message: string,
        code?: number

    }

    interface ILogin {
        token: string,
        message: string,
        code?: number
    }

    interface IAccount {
        code: number
        email: string,
        userName: string
    }
}