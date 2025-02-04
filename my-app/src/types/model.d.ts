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
    interface IRestaurantData {
        _id: string;
        title: string;
        image: string;
        phone: string;
        address: string;
        email: string;
        rating: number;
        status: string;
        slug: string;
        deleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }
    interface IMenuesData {
        _id: string;
        title: string;
        image: string;
        description: string,
        price: string,
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IRestaurant {
        code: number,
        data: IRestaurantData[],
        message: string

    }
    interface IMenues {
        code: number,
        data: IMenuesData[],
        message: string
    }
    interface IRestaurantDetail {
        code: number,
        data: IRestaurantData,
        message: string
    }
}