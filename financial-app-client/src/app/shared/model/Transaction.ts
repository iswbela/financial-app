export class Transaction{
    static createByJson(json: any){
        new Transaction(
            json.id,
            json.userId,
            json.date,
            json.description,
            json.amount,
        )
    }

    static getInstance(){
        return new Transaction(
            null,
            null,
            null,
            null,
            null
        )
    }

    constructor(
        public id: number | null,
        public userId: number | null,
        public date: any | null,
        public description: string | null,
        public amount: number | null,
    ) { }
}