// get and create the programming language resource

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getUser(user){
    let query = `SELECT username, avatar, name, bio, dob, hometown FROM USER WHERE id = ${user.id}`;
    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);
    return data;
}

async function updateUser(user, id){
    let query = `UPDATE USER SET avatar = "${user.avatar}", bio = "${user.bio}", name = "${user.name}", dob = "${user.dob}", hometown = "${user.hometown}" WHERE id = ${id.id}`;
    const result = await db.query(query);
    let message = 'Error in updating user';

    if (result.affectedRows){
        message = 'User updated successfully';
    }
}

async function postUser(user){
  let query = `INSERT INTO USER (username, password) VALUES ("${user.username}","${user.password}")`;
  const result = await db.query(query);
  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return {message};
}

async function createCampaign(campaign){
  let query = `INSERT INTO CAMPAIGN (name) VALUES ("${campaign.name}")`;
  const result = await db.query(query);
  let message = 'Error in creating campaign';

  if (result.affectedRows) {
    message = 'Campaign created successfully';
  }

  return {message};
}

async function getAllCampaigns() {
  const rows = await db.query(`SELECT * FROM CAMPAIGN`);
  const data = helper.emptyOrRows(rows);
  return data;
}


async function getAllUsers() {
    const rows = await db.query(
        `SELECT *
         FROM USER`
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

    async function createPost(post) {
        let query = `INSERT INTO POST (userId, body, tags)
                     VALUES ("${post.userId}", "${post.body}", "${post.tags}")`;
        const result = await db.query(query);
        let message = 'Error in creating user';

        if (result.affectedRows) {
            message = 'User created successfully';
        }
        return message;
    }

    async function getAllPosts() {
        console.log('Getting posts');
        const rows = await db.query(
            `SELECT p.*, u.username as username, u.avatar as avatar
             FROM POST as p
                      INNER JOIN USER as u ON p.userId = u.id`
        );
        const data = helper.emptyOrRows(rows);
        console.log(data);
        return data;
    }

    async function getUserPosts(user){
    console.log('Getting user posts');
    const rows = await db.query(
        `SELECT p.*, u.username as username, u.avatar as avatar 
                FROM POST as p INNER JOIN USER as u ON p.userId = u.id 
                WHERE p.userId = ${user.id}`
    );
    const data = helper.emptyOrRows(rows);
    console.log(data);
    return data;
    }

    async function postReply(reply) {
        console.log('creating reply');
        const rows = await db.query(
            `INSERT INTO REPLY (userId, postId, body)
             VALUES (${reply.userId}, ${reply.postId}, '${reply.body}')`
        )
    }

    async function getReplies(post) {
        console.log('getting replies');
        const rows = await db.query(
            `SELECT u.username, u.avatar, r.id, r.body
             FROM REPLY AS r
                      INNER JOIN USER as u ON u.id = r.userId
             WHERE r.postId = ${post.id}`
        );
        const data = helper.emptyOrRows(rows);
        console.log(data);
        return data;
    }

    async function likePost(post) {
        console.log('liking post');
        await db.query(
            `UPDATE POST
             SET likes = likes + 1
             WHERE id = ${post.postId}`
        );
    }

    async function getAllRegisteredUsers() {
        console.log('Getting registered users');
        const rows = await db.query(
            `SELECT *
             FROM USER`
        );
        const data = helper.emptyOrRows(rows);


        return {
            data
        }
    }

    async function loginUser(user) {
        const rows = await db.query(
            `SELECT *
             FROM USER
             WHERE username = "${user.username}"
               AND password = "${user.password}"`
        );
        const data = helper.emptyOrRows(rows);
        if (data.length > 1) {
            throw new Error("multiple user with the same username password combination");
        }
        if (data.length == 1) {
            return data[0];
        }
        return {error: "Incorrect name or password"};


    }

    async function getAll(page = 1) {
        const offset = helper.getOffset(page, config.listPerPage);
        const rows = await db.query(
            `SELECT DDCHARACTER.*,
                    race_id,
                    class_id,
                    RACE.name     AS race_name,
                    CLASS.name    AS class_name,
                    CAMPAIGN.name AS campaign_name,
                    USER.username AS owner_name

             FROM DDCHARACTER
                      JOIN RACE ON DDCHARACTER.race_id = RACE.id
                      JOIN CLASS ON DDCHARACTER.class_id = CLASS.id
                      JOIN CAMPAIGN ON DDCHARACTER.campaign_id = CAMPAIGN.id
                      LEFT JOIN USER ON DDCHARACTER.owner_id = USER.id;`
        );
        const data = helper.emptyOrRows(rows);
        const meta = {page};

        return {
            data,
            meta
        }
    }

    async function getAllSpells() {
        const rows = await db.query(`SELECT *
                                     from SPELLS`);
        const data = helper.emptyOrRows(rows);

        return data
    }

    async function getSpellByClass(class_id) {
        const rows = await db.query(`SELECT *
                                     FROM SPELLS
                                     WHERE class_id = ${class_id}`);
        const data = helper.emptyOrRows(rows);

        return data
    }

    async function getSpellIdsKnownByCharacter(character_id) {
        const rows = await db.query(`SELECT s.id
                                     FROM KNOWS_SPELL as KS
                                              JOIN SPELLS as S on S.id = KS.spell_id
                                     WHERE KS.character_id = ${character_id};`);
        const data = helper.emptyOrRows(rows);
        const ids = data.map(spell => spell.id);
        return ids;
    }

    async function addSpellToCharacter(addSpell) {
        await db.query(`INSERT INTO KNOWS_SPELL(spell_id, character_id)
                        VALUES (${addSpell.spell_id}, ${addSpell.character_id})`)
    }

    async function removeSpellFromCharacter(removeSpell) {
        await db.query(`DELETE
                        FROM KNOWS_SPELL
                        WHERE spell_id = ${removeSpell.spell_id}
                          AND character_id = ${removeSpell.character_id}`);
    }


    async function getAllClasses() {
        const rows = await db.query(
            `SELECT *
             FROM CLASS`
        );
        const data = helper.emptyOrRows(rows);

        return data
    }

    async function getAllRaces() {
        const rows = await db.query(
            `SELECT *
             FROM RACE`
        );
        const data = helper.emptyOrRows(rows);

        return data
    }

    /* call stored procedure create character */
    async function createCharacter(character) {
        let query = `CALL create_character("${character.char_name}",${character.race_id},${character.class_id},
    ${character.campaign_id},${character.owner_id || "NULL"})`;
        const result = await db.query(query);

        let message = 'Error in creating character';

        if (result.affectedRows) {
            message = 'Character created successfully';
        }

        return {message};
    }

    async function update(id, character) {
        const result = await db.query(
            `UPDATE DDCHARACTER
             SET char_name="${character.char_name}",
                 campaign_id = ${character.campaign_id}
             WHERE id = ${id}`
        );

        let message = 'Error in updating character';

        if (result.affectedRows) {
            message = 'Character updated successfully';
        }

        return {message};
    }

    async function remove(id) {
        const result = await db.query(
            `DELETE
             FROM DDCHARACTER
             WHERE id = ${id}`
        );

        let message = 'Error in deleting character';

        if (result.affectedRows) {
            message = 'Character deleted successfully';
        }

        return {message};

    }

    module.exports = {
        getUser,
        updateUser,
        getAll,
        createPost,
        getAllPosts,
        likePost,
        getUserPosts,
        getReplies,
        postReply,
        createCharacter,
        update,
        remove,
        getAllClasses,
        getAllRaces,
        getAllSpells,
        postUser,
        loginUser,
        getAllUsers,
        getAllCampaigns,
        createCampaign,
        getAllSpells,
        getSpellByClass,
        getSpellIdsKnownByCharacter,
        addSpellToCharacter,
        removeSpellFromCharacter,

}