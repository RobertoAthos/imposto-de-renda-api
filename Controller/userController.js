const bcrypt = require('bcryptjs')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')

const validateRegisterInputs = require('../validation/validation')

const UserController = {
    register: async(req,res)=>{

        const {isValid, errors} = validateRegisterInputs(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const {cpf,email,password,data,fullName} = req.body
    

        if(!cpf || !email || !password || !data || !fullName ){
            return res.status(400).json({success:false, message: 'Provavelmente você faltou com alguns campos'})
        }

       

        const UserAlreadyExists = await User.findOne({cpf:req.body.cpf})
        if(UserAlreadyExists){
            return res.status(400).send('Cpf já existe')
        }
        const newUser = new User(req.body)
        const salt =  bcrypt.genSaltSync(10);
        newUser.password =  bcrypt.hashSync(req.body.password, salt)

        try {
            const saveUser = await newUser.save()
            res.send(saveUser)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    login: async(req,res)=>{
        const UserAlreadyExists = await User.findOne({cpf:req.body.cpf})
        if(!UserAlreadyExists){
            return res.status(400).send('Cpf não existe/inválido')
         
        }

        const loginUser = bcrypt.compareSync(req.body.password, UserAlreadyExists.password)
        if(!loginUser){
            return res.status(400).send('Cpf não existe/inválido')
        }

       const token = jwt.sign({_id: UserAlreadyExists._id}, process.env.TOKEN_SECRET)
/*        res.status(200).send('User Logged') */
        res.json(token)


       
    }
}

module.exports = UserController

