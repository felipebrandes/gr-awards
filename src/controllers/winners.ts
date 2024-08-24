import { Request, Response } from "express";
import WinnersService from "../services/winners";

class WinnersController {
    private winnersService: WinnersService;

    constructor(intervalPrizesService: WinnersService) {
        this.winnersService = intervalPrizesService;
    }

    async getMinMaxInterval(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.winnersService.getMinMaxInterval();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch winners" });
        }
    }
}

export default WinnersController;
