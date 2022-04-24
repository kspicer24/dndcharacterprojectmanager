// glue between the URI and the corresponding function in the services/character.js

const express = require('express');
const router = express.Router();
const ddcharacters = require('../services/character');


router.get('/users', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getAllRegisteredUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.post('/users', async function(req, res, next) {
  try {
    console.log("hello post");
    res.json(await ddcharacters.postUser(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});


/* GET all dd character classes */
router.get('/classes', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getAllClasses(req.query.page));
  } catch (err) {
    console.error(`Error while getting ddcharacter classes `, err.message);
    next(err);
  }
});

/* GET all dd spells */
router.get('/spells', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getAllSpells(req.query.page));
  } catch (err) {
    console.error(`Error while getting spells`, err.message);
    next(err);
  }
});


/* GET all dd character races */
/* GET all dd character classes */
router.get('/races', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getAllRaces(req.query.page));
  } catch (err) {
    console.error(`Error while getting ddcharacter races`, err.message);
    next(err);
  }
});

/* GET all dd characters. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getAll(req.query.page));
  } catch (err) {
    console.error(`Error while getting ddcharacters `, err.message);
    next(err);
  }
});

/* POST ddcharacter */
router.post('/', async function(req, res, next) {
  try {
    console.log("hello post");
    res.json(await ddcharacters.createCharacter(req.body));
  } catch (err) {
    console.error(`Error while creating chharacter`, err.message);
    next(err);
  }
});

/* PUT DDCHARACTER */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await ddcharacters.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating character`, err.message);
    next(err);
  }
});
 
/* DELTE DDCHARACTER */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await ddcharacters.remove(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while deleting character`, err.message);
    next(err);
  }
});
 



module.exports = router;