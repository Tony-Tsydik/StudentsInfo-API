import url from 'url';
import { initializeDB } from '../dbUtils';
import initConfig from '../config';


const config = initConfig();
const dbInstance = initializeDB(config.get('databaseConfig'));

export const getUserController = (req, res) => {
    let urlRequest = url.parse(req.url, true);
    dbInstance.findAll({ where: urlRequest.query, raw: true })
        .then(users => {
            res.end(JSON.stringify(users))
        }).catch(err => console.log(err));
}

export const addUserController = (req, res) => {
    dbInstance.create(req.body)
        .then(() => {
            res.status(200).end("OK");
        })
        .catch((insertError) => {
            console.log(insertError);
            res.status(422).end(JSON.stringify(insertError));
        });
}

export const updateUserController = (req, res) => {
    dbInstance.update(req.body.data, {
        where: req.body.where
    }).then((response) => {
        res.status(200).end(`Number of modified rows : ${JSON.stringify(response)[1]}`);
    })
        .catch((insertError) => {
            console.log(insertError);
            res.status(404).end(JSON.stringify(insertError));
        });
}

export const deleteUserController = (req, res) => {
    let urlRequest = url.parse(req.url, true);
    dbInstance.destroy({ where: urlRequest.query })
        .then((response) => {
            res.status(200).end(`Number of deleted rows : ${JSON.stringify(response)}`);
        })
        .catch((insertError) => {
            console.log(insertError);
            res.status(404).end(JSON.stringify(insertError));
        });
}

export const getAllUsersController = (req, res) => {
    dbInstance.findAll({ raw: true }).then(users => {
        res.end(JSON.stringify(users));
    }).catch(err => console.log(err));
}