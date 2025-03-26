export class UserDTO{
    static createByJson(json: any){
        new UserDTO(
            json.id,
            json.email,
            json.name
        )
    }

    static getInstance(){
        return new UserDTO(
            null,
            null,
            null
        )
    }

    constructor(
        public id: number | null,
        public email: string | null,
        public name: string | null
    ) { }
}