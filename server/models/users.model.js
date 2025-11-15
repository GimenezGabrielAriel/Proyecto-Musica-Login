import { mongoose} from 'mongoose'
import bcrypt from 'bcrypt'


const userSchema = mongoose.Schema(
    {
        firstName : {
            type : String, 
            required : [true, "El nombre del usuario es obligatorio."],
            minlength : [3, "El nombre debe tener al menos 3 caracteres."]
        },
        lastName : {
            type : String, 
            required : [true, "El apellido del usuario es obligatorio."],
            minlength : [3, "El apellido debe tener al menos 3 caracteres."]
        },
        email : {
            type: String,
            required : [true, "Se debe añadir el correo electrónico."],
            unique : true
        },
        password : {
            type : String,
            required : [true, "La contraseña es obligatoria."],
            minlength : [8, "La contraseña debe tener al menos 8 caracteres."]
        }
    }, {timestamps : true}
)


// metodo virtual
userSchema.virtual('passwordConfirmation').get(
    function(){
        return this._passwordConfirmation;
    }

).set(function(value){
    this._passwordConfirmation = value;
});

userSchema.pre('validate', function(next){
    if(this.password !== this.passwordConfirmation){
        this.invalidate('passwordConfirmation', 'La contraseña y la confirmación de la contraseña no coinciden.')
    }
    next();
})


//metodo de hash para proteger pass

userSchema.pre('save',function(next){
    bcrypt.hash(this.password,10).then((ecnryptedPass)=> {
        this.password = ecnryptedPass;
        next();
    })
})



const User = mongoose.model('users', userSchema)

export {User, userSchema}