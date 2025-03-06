export class UserCreationDTO{
    static createByJson(json: any){
        new UserCreationDTO(
            json.name,
            json.email,
            json.password
        )
    }

    static getInstance(){
        return new UserCreationDTO(
            null,
            null,
            null
        )
    }

    constructor(
        public name: string | null,
        public email: string | null,
        public password: string | null
    ) { }
}