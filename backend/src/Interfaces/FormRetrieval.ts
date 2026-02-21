export default interface Petition {
    request_id: number; //Internal DB id
    type:string;
    department: string;
    subject: string;
    description: string;
    solved: boolean;
}