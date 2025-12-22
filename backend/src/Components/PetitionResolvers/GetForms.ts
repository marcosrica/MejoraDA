import Database from "../Database";

export default async function GetFilters(type:string, department:string, solvedToo:boolean, db: Database) {
    console.log("Getting filters for type:", type, "department:", department, "solvedToo:", solvedToo);
    if(type == "All") {
        
    }
    else {
        let result;
        switch(type) {
            case "Idea":
                result = await db.RetrieveIdeas(department, solvedToo);
                break;

            case "Complaint":
                result = await db.RetrieveComplaints(department, solvedToo);
                break;

            case "Suggestion":
                result = await db.RetrieveSuggestions(department, solvedToo);
                break;
        }
        console.log("Retrieved complaints:", result);
        return result;
    }
}