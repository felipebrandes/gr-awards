import { Router } from "express";
import db from "../config/database";
import ProducerRepository from "../repositories/producerRepository";
import WinnersService from "../services/winners";
import WinnersController from "../controllers/winners";

const winnersRouter = Router();

// Injeção manual das dependências
const producerRepository = new ProducerRepository(db);
const winnersService = new WinnersService(producerRepository);
const winnersController = new WinnersController(winnersService);

winnersRouter.get(
    "/min-max-interval",
    async (req, res) =>
        await winnersController.getMinMaxInterval(req, res)
);

export default winnersRouter;
