import { Router } from 'express';
import { addUserController, deleteUserController, getAllUsersController, getUserController, updateUserController } from '../controllers/controllers';


export default () =>
    Router()
        .get('/getAllUsers' , getAllUsersController)
        .delete('/deleteUser' , deleteUserController)
        .put('/updateUser' , updateUserController)
        .post('/addUser' , addUserController)
        .get('/getUser', getUserController);