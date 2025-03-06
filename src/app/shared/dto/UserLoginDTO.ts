export class UserLoginDTO{
    static createByJson(json: any){
        new UserLoginDTO(
            json.email,
            json.password
        )
    }

    static getInstance(){
        return new UserLoginDTO(
            null,
            null
        )
    }

    constructor(
        public email: string | null,
        public password: string | null
    ) { }
}