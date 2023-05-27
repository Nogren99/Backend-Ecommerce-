import { Router } from "express";
import passport from 'passport';
import { userRegistered, githubCallback, registerFail, login, failLogin, reset, logout } from "../controllers/sessions.controller.js";

const router=Router()

router.get('/github',passport.authenticate('github', { scope: ['user:email'] }),userRegistered);
router.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback)
router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), userRegistered);
router.get('/fail-register', registerFail);
router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login' }), login);
router.get('/fail-login', failLogin);
router.post('/reset', reset);
router.get('/logout', logout);


export default router