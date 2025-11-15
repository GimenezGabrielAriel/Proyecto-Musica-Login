import { mongoose } from "mongoose";
import { songsSchema } from "./songs.model.js";


const playlistSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : [true, "El nombre es obligatorio."],
            unique: true
        },
        songs : [songsSchema]
    }, 
    {timestamps: true}
)

const Playlist = mongoose.model("playlist", playlistSchema);

export default Playlist;