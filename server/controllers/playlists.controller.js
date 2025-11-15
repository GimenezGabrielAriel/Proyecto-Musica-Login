import Playlist from "../models/playlists.model.js";
import { Songs } from "../models/songs.model.js";

const playlistController = {
  getAll: async (req, res) => {
    try {
      const allPlaylist = await Playlist.find();
      return res.status(201).json(allPlaylist);
    } catch (e) {
      return res.status(400).json(e);
    }
  },
  getOne: async (req, res) => {
    try {
      const onePlaylist = await Playlist.findById(req.params.id);
      if (!onePlaylist) {
        return res.status(404).json({ message: "Playlist no encontrada" });
      }
      return res.status(200).json(onePlaylist);
    } catch (e) {
      return res.status(400).json(e);
    }
  },

  createOne: async (req, res) => {
    const { name, songs } = req.body;
    try {
      const foundSongs = await Songs.find({ title: { $in: songs } });
      if (foundSongs.length !== songs.length) {
        return res
          .status(400)
          .json({
            message: "Una o mas de las canciones no fueron encontradas",
          });
      }
      const newArray = {
        name: name,
        songs: foundSongs,
      };
      const savedPlaylist = await Playlist.create(newArray);
      res.status(201).json(savedPlaylist);
    } catch (e) {
      if (e.code === 11000) {
        return res.status(400).json({
          errors: {
            name: { message: "Esta playlist ya existe. Elige otro nombre." },
          },
        });
      }
      const messages = {};
      if (e.name === "ValidationError") {
        Object.keys(e.errors).forEach((key) => {
          messages[key] = e.errors[key]; 
        });
        return res.status(400).json({ errors: { ...messages } });
      }
      return res.status(400).json(e);
    }
  },
  deleteOne: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedPlaylist = await Playlist.findByIdAndDelete(id);
      if (!deletedPlaylist) {
        return res.status(404).json({ message: "El ID indicado no existe" });
      }
      res
        .status(201)
        .json({ message: "La playlist fue eliminada correctamente" });
    } catch (e) {
      return res.status(400).json(e);
    }
  },
  updateOne: async (req, res) => {
    const id = req.params.id;
    const { name, songs } = req.body;
    const dataTobeUpdated = {};
    if (name) dataTobeUpdated.name = name;
    try {
      if (songs) {
        const songRegexes = songs.map(
          (title) => new RegExp("^" + title + "$", "i")
        );
        const foundSongs = await Songs.find({ title: { $in: songRegexes } });
        if (foundSongs.length !== songs.length) {
          return res.status(400).json({
            message: "Una o más canciones no existen en la base de datos.",
          });
        }
        dataTobeUpdated.songs = foundSongs;
      }
      const oneUpdated = await Playlist.findByIdAndUpdate(id, dataTobeUpdated, {
        new: true,
        runValidators: true,
      });
      if (!oneUpdated) {
        return res.status(404).json({ message: "El ID indicado no existe" });
      }
      res.status(201).json(oneUpdated);
    } catch (e) {
      if (e.code === 11000) {
        return res.status(400).json({
          errors: {
            name:  { message: "Esta playlist ya existe. Elige otro nombre." },
          },
        });
      }
      const messages = {};
      if (e.name === "ValidationError") {
        Object.keys(e.errors).forEach((key) => {
          messages[key] = e.errors[key].message;
        });
      }
      return res.status(400).json({ errors: { ...messages } });
    }
  },
};

export default playlistController;
