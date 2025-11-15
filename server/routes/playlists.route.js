import {Router} from 'express'
import playlistController from '../controllers/playlists.controller.js'
import validateToken from "../middleware/validateToken.js";


const playlistRoutes = Router();

playlistRoutes.get('/', validateToken ,playlistController.getAll)
playlistRoutes.post('/', validateToken ,playlistController.createOne)
playlistRoutes.get('/:id', validateToken ,playlistController.getOne)
playlistRoutes.delete('/:id', validateToken ,playlistController.deleteOne)
playlistRoutes.put('/:id', validateToken ,playlistController.updateOne)

export default playlistRoutes;