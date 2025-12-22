export default interface Petition {
    request_id: number; //Internal DB id
    department: string;
    subject: string;
    description: string;
    solved: boolean;
    date: string;
}