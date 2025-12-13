import serverRoutes from './../../keys';

class PetitionResult {
    status: number;
    data: any;
    error: boolean;

    constructor(status?: number, data?: any, error?: boolean) {
        this.status = status || 0;
        this.data = data || null;
        this.error = error || false;
    }
}

class PetitionMaker {
    routes:serverRoutes;

    constructor() {
        this.routes = new serverRoutes();
    }

    makePetition = async (url: string, method: string, body?: any): Promise<PetitionResult> => {
        let result: PetitionResult = new PetitionResult();

        try {
            const response:Response = await fetch(this.routes.backend + url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            console.log(data);

            result = new PetitionResult(response.status, data, false);
        }
        catch (error) {
            result.error = true;
        }

        return result;
    }
}

export default PetitionMaker;