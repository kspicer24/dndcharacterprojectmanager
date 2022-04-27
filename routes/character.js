// glue between the URI and the corresponding function in the services/character.js

const express = require('express');
const router = express.Router();
const ddcharacters = require('../services/character');



/* Create a campaign */
router.post('/campaign', async function(req, res, next) {
  try {
    const result = await ddcharacters.createCampaign(req.body);
    console.log(result);
    res.json(result);
    
  } catch (err) {
    console.error(`Error while creating campaign `, err.message);
    next(err);
  }

})


/* Get spells by class id */
router.get('/spells/:id', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getSpellByClass(req.params.id));
  } catch (err) {
    console.error(`Error while getting campaign `, err.message);
    next(err);
  }
});

router.get('/spellsForCharacter/:id', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getSpellIdsKnownByCharacter(req.params.id));
  } catch (err) {
    console.error(`Error while getting campaign `, err.message);
    next(err);
  }
});

//add spell
router.post('/spellsForCharacter', async function(req, res, next) {
  try {
    await ddcharacters.addSpellToCharacter(req.body);
    res.status(200).send();
  } catch (err) {
    console.error(`Error while getting campaign `, err.message);
    next(err);
  }
});

//remove spell from character
router.delete('/spellsForCharacter', async function(req, res, next) {
  try {
    await ddcharacters.removeSpellFromCharacter(req.body);
    res.status(200).send();
  } catch (err) {
    console.error(`Error while getting campaign `, err.message);
    next(err);
  }
});

/* Get all campaigns */
router.get('/campaign', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getAllCampaigns(req.body));
  } catch (err) {
    console.error(`Error while getting campaign `, err.message);
    next(err);
  }
});



router.get('/users', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getAllUsers());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});


/* For logging in */
router.post('/login', async function(req, res, next) {
  console.log("logging" + JSON.stringify(req.body));
  try {
    const result = await ddcharacters.loginUser(req.body);
    console.log(result);
    res.json(result);
    
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* For registering*/

router.post('/register', async function(req, res, next) {
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


 
/* DELETE DDCHARACTER */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await ddcharacters.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting character`, err.message);
    next(err);
  }
});
 



module.exports = router;