import PetitionMaker from "./PetitionMaker";

const petitionMaker:PetitionMaker = new PetitionMaker();

async function checkTokenValidity() {
    console.log("CHekicng for token");

    petitionMaker.makeGetPetition("/api/auth/timeLeft");
}

export default function startCheck() {
    setInterval(checkTokenValidity, 60000)
}