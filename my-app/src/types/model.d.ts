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
        restaurant: IRestaurantData;
        image: string;
        description: string,
        price: string,
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IProfileData {
        userName: string,
        email: string
    }

    interface IOrderHistoryData {
        _id: string,
        userId: string,
        restaurantId: string,
        totalPrice: number,
        totalQuantity: number,
        orderItems: IMenuesData[],
        fullName: string,
        address: string,
        phone: string,
        status: string,
        payment: string,
        createdAt: Date,
        updatedAt: Date,
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
    interface IProductDetail {
        code: number,
        data: IMenuesData,
        message: string
    }
    interface IRestaurantDetail {
        code: number,
        data: IRestaurantData,
        message: string
    }

    interface IProfile {
        code: number,
        data: IProfileData,
        message: string
    }

    interface IOrderHistory {
        code: number,
        data: IOrderHistoryData[],
        message: string
    }

    interface ICart {
        [restaurantId: string]: {
            sum: number;
            title: String
            quantity: number;
            items: {
                [productId: string]: {
                    quantity: number;
                    data: IMenuesData;
                };
            };
        };
    }
}