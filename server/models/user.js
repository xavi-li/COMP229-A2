// require modules for the model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let user = mongoose.Schema
(
    {
        username:
        {
            type:String, 
            default:'',
            trim:true,
            required:'Msg: Username is required'
        },

        // todo
        // passpord :
        // {
        //     type:String,
        //     default:'',
        //     trim:true,
        //     required:"Msg: Pasport is required"
        // }

        email : 
        {
            type:String,
            default:'',
            trim:true,
            required:'Msg: Email Address is required'
        },

        displayName :
        {
            type:String,
            default:'',
            trim:true,
            required:'Msg: Display Name is required'
        },

        created: 
        {
            type:Date,
            default:Date.now
        }, 

        updated:
        {
            type:Date,
            default:Date.now
        }
    },

    // create a collection for user
    {
        collection:"users"
    }
);

// config options for user model
let options = ({missingPasswordError:'wrong/Missing Password'});
user.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('user', user);