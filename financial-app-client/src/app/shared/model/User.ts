export class User{
    static createByJson(json: any){
        new User(
            json.id,
            json.name,
            json.email,
            json.password,
            json.createdAt,
            json.updatedAt,
            json.balance,
            json.deletedAt,
            json.status
        )
    }

    static getInstance(){
        return new User(
            null,
            null,
            null,
            null,
            null,
            null,
            0,
            null,
            false
        )
    }

    constructor(
        public id: number | null,
        public name: string | null,
        public email: string | null,
        public password: string | null,
        public createdAt: any | null,
        public updatedAt: any | null,
        public balance: number | null,
        public deletedAt: any | null,
        public status: boolean
    ) { }
}