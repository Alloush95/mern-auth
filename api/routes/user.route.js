import express from 'express';
import { test } from '../controllers/user.controllers.js';

const router = express.Router();// create a router object

router.get('/', test); // define the home page route


export default router; // export the router object