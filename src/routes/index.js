const express = require("express");
const router = express.Router();
const passport = require('passport');
const Task = require('../models/Tasks');
const user = require("../models/user");

// Ruta raíz
router.get('/', (req, res, next) => {
    res.render('index');
});

// Signup registro de usuarios
router.get('/signup', (req, res, next)=>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

// Signin ingreso de usuarios
router.get('/signin', (req, res, next)=>{
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

// Cerrar sesion
/*
router.get('/logout', (req,res,next) =>{
    req.logOut();
    res.redirect('/');
});
*/
router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err) { return next(err); }
        res.redirect('/');
    });
});

// Perfil
router.get('/profile', isAuthenticated, (req,res, next) =>{
    res.render('profile');
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

// Tareas
router.get('/tasks', isAuthenticated, lectura_task , async(req, res, next) =>{
});

router.post('/tasks/add', async (req, res, next) => {
    const task = Task(req.body);
    const user = req.user.id;
    task.cuenta = user;
    const save_task = await task.save();
    console.log(save_task);
    res.redirect('/tasks');
});

async function lectura_task(req, res, next){
    const task = await Task.find({ cuenta:req.user.id });
    res.render('tasks', { task });
};
module.exports = router;