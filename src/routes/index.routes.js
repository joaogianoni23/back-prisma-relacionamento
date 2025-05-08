import express from 'express';

//importar todas as rotas
import authRouter from './auth.routes.js';
import animesRouter from './animeRoutes.js';
import personagensRouter from './personagemRoutes.js';
import collectionsRouter from './collectionRoutes.js';
import cardsRouter from './cardRoutes.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//Rotas públicas
router.use('/auth', authRouter);
router.use('/collections', collectionsRouter);
router.use('/cards', cardsRouter);

//Rotas privadas
router.use(authMiddleware);

router.use('/animes', animesRouter);
router.use('/personagens', personagensRouter);

export default router;