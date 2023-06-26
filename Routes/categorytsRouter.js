import express from 'express';
import data from '../data.js';
const categorytsRouter = express.Router();

categorytsRouter.get('/', (req, res) => {
    res.send(data.category);
});



export default categorytsRouter;