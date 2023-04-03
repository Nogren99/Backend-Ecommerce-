import { Router } from "express";
import { userModel } from "../dao/models/users.model.js";
import passport from 'passport';
import { createHash } from '../utils.js'
import session from 'express-session';

const router=Router()

router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    async (req, res) => {
        res.send({ status: 'sucess', message: 'user registered' });
    });

router.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/api/products');
})


router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
    res.send({ status: 'success', message: 'user registered' })
});

router.get('/fail-register', async (req, res) => {
    res.send({ status: 'error', message: 'register failed' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
    console.log("login")
    console.log(req.user)
    if (!req.user) return res.status(400)
        .send({ status: 'error', message: 'Invalid credentials' });

    console.log(req.session)
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
    }
    console.log( req.session.user)
    console.log("Login exitoso!")


    res.send({ status: 'success', message: 'login success' });
    //res.redirect('/api/products') no funciona
});

router.get('/fail-login', async (req, res) => {
    console.log("fail/login")
    res.send({ status: 'error', message: 'login failed' });
});

router.post('/reset', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400)
        .send({ status: 'error', message: 'Incomplete values' });

    try {
        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).send({ status: 'error', message: 'User not found' });

        user.password = createHash(password);

        await userModel.updateOne({ email }, user);

        res.send({ status: 'success', message: 'reset success' });

    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'couldnt logout' });
        res.redirect('/');
    })
});

/*
router.post('/register', async(req, res) =>{
    const { first_name, last_name, email, age, password} = req.body;

    console.log(req.body)

    console.log(first_name, last_name, email, age, password)
    try {
        const exists = await userModel.findOne({ email });
        if (exists) return res.status(400).send({ status: 'error', error: 'user already exists' });

        //if(email='adminCoder@coder.com'){role='admin'}else{role='user'}

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
            //role
        };

        await userModel.create(user);

        res.send({ status: 'success', message: 'user registered' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
})

router.post('/login', async(req, res) =>{
    const { email, password } = req.body;
    console.log(req.body)

    try {
        
        const user = await userModel.findOne({ email, password });
        if (!user) return res.status(400).send({ status: 'error', error: 'incorrect credentials' });

        console.log("entro")
        console.log(user)
        console.log("/ ")
        console.log(req.session)
        // Autenticar al usuario y almacenar su sesión en MongoDB
        req.session.user = {
            name:user.first_name,
            email:user.email,
            age:user.age
        }
        console.log(req.session)
        console.log("q")
        console.log(req.session.user.name)
        console.log("funciona")

        res.redirect('/api/products')
        //res.send({ status: 'success', message: 'login success' });

    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'couldnt logout' });
        res.redirect('/');
    })
});

*/
export default router