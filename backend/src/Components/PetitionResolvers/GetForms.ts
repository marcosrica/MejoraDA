import Petition from "src/Interfaces/FormRetrieval";
import Database from "../Database";

export default async function GetFilters(type:string, department:string, solvedToo:boolean, db: Database) {
    try {
        console.log("Getting filters for type:", type, "department:", department, "solvedToo:", solvedToo);

        if (type === "All") {
            const [complaints, ideas, suggestions] = await Promise.all([
                db.RetrieveComplaints(department, solvedToo),
                db.RetrieveIdeas(department, solvedToo),
                db.RetrieveSuggestions(department, solvedToo),
            ]);

            return JoinForms(complaints, ideas, suggestions);
        }
        else {
            let result:Petition[] = []
            switch (type) {
                case "Idea":
                    result = await db.RetrieveIdeas(department, solvedToo);
                    break;
                case "Complaint":
                    result = await db.RetrieveComplaints(department, solvedToo);
                    break;
                case "Suggestion":
                    result = await db.RetrieveSuggestions(department, solvedToo);
                    break;
                default:
                    throw new Error(`Unknown type: ${type}`);
            }

            result.sort((a, b) => {
                return Number(a.solved) - Number(b.solved);
            });

            return result;
        }
    } catch (err) {
        console.error("GetFilters failed:", err);
        throw err;
    }
}


const JoinForms = (complaints: Petition[], ideas: Petition[], suggestions: Petition[]): Petition[] => {
    let origin:Petition[] = [];
    let result = origin.concat(complaints, ideas, suggestions)

    result.sort((a, b) => {
       return Number(a.solved) - Number(b.solved);
    });

    return result;
};
