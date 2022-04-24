// get and create the programming language resource

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function postUser(user){
  let query = `INSERT INTO USER (username, password) VALUES ("${user.username}","${user.password}")`;
  const result = await db.query(query);
  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return {message};
}

async function getAllRegisteredUsers() {
console.log('Getting registered users');
const rows = await db.query(
  `SELECT * FROM USER`
);
const data = helper.emptyOrRows(rows);  

return data
}

async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT DDCHARACTER.*, race_id, class_id, RACE.name AS race_name, 
    CLASS.name AS class_name FROM DDCHARACTER 
    JOIN RACE ON DDCHARACTER.race_id = RACE.id
    JOIN CLASS ON DDCHARACTER.class_id = CLASS.id`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getAllSpells() {
    const rows = await db.query(
        `SELECT KNOWS_SPELL.*, SPELLS.name AS spell_name, 
        CLASS.name AS class_name FROM KNOWS_SPELL JOIN SPELLS 
        ON KNOWS_SPELL.spell_id = SPELLS.id
        JOIN CLASS on KNOWS_SPELL.class_id = CLASS.id;`
      );
      const data = helper.emptyOrRows(rows);  
  
      return data
}

async function getAllClasses() {
    const rows = await db.query(
      `SELECT * FROM CLASS`
    );
    const data = helper.emptyOrRows(rows);  

    return data
}

async function getAllRaces() {
    const rows = await db.query(
      `SELECT * FROM RACE`
    );
    const data = helper.emptyOrRows(rows);  

    return data
}
/* call stored procedure create character */
async function createCharacter(character){
    let query = `CALL create_character("${character.char_name}",${character.race_id},${character.class_id})`;
    const result = await db.query(query);
  
    let message = 'Error in creating character';
  
    if (result.affectedRows) {
      message = 'Character created successfully';
    }
  
    return {message};
  }

  async function update(id, character){
    const result = await db.query(
      `UPDATE DDCHARACTER 
      SET char_name="${character.char_name}", 
      class_id = ${character.class_id},
      race_id = ${character.race_id},
      wisdom = ${character.wisdom},
      charisma = ${character.charisma},
      strength = ${character.strength},
      dexterity = ${character.dexterity},
      intelligence = ${character.intelligence},
      constitution = ${character.constitution}
      WHERE id=${id}` 
    );
  
    let message = 'Error in updating character';
  
    if (result.affectedRows) {
      message = 'Character updated successfully';
    }
  
    return {message};
  }

  async function remove(id){
    const result = await db.query(
      `DELETE FROM DDCHARACTER WHERE id=${id}`
    );
  
    let message = 'Error in deleting programming language';
  
    if (result.affectedRows) {
      message = 'Character deleted successfully';
    }
  
    return {message};

}

module.exports = {
  getAll,
  createCharacter,
  update,
  remove,
  getAllClasses,
  getAllRaces,
  getAllSpells,
  postUser,
  getAllRegisteredUsers
}