import { userModel } from "../dao/models/users.model.js";
import { createHash } from '../utils.js'
import session from 'express-session';

const userRegistered = async (req, res) => {
    res.send({ status: 'sucess', message: 'user registered' });
}

const githubCallback = (req, res) => {
    req.session.user = req.user;
    res.redirect('/api/products');
}
const registerFail = async (req, res) => {
    res.send({ status: 'error', message: 'register failed' });
}

const login = async (req, res) => {
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
}

const reset = async (req, res) => {
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
}

const failLogin = async (req, res) => {
    console.log("fail/login")
    res.send({ status: 'error', message: 'login failed' });
}

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'couldnt logout' });
        res.redirect('/');
    })
}

export {
    userRegistered,
    githubCallback,
    registerFail,
    login,
    reset,
    failLogin,
    logout
}