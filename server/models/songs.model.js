import { mongoose } from "mongoose";

const songsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            minlength: [6, "El título no es lo suficientemente largo. Debe tener al menos 6 caracteres."],
            maxlength: [255, "El título es demasiado largo."],
            required: [true, "El título es obligatorio."]
        },
        artist: {
            type: String,
            required: [true, "Debes agregar el nombre del artista."],
            minlength: [10, "El nombre del artista debe tener al menos 10 caracteres."],
            maxlength: [255, "El nombre del artista es demasiado largo."]
        },
        yearOfRealease: {
            type: Number,
            required: [true, "El año de lanzamiento es obligatorio."],
            min: [1900, "El año de lanzamiento no puede ser anterior a 1900."],
            max: [2025, "El año de lanzamiento no puede ser del futuro."]
        },
        genre: {
            type: String,
            required: [true, "Debes agregar el género musical."]
        }
    },
    { timestamps: true }
);

const Songs = mongoose.model('songs', songsSchema);

export { Songs, songsSchema };
