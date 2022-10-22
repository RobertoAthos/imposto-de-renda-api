const isEmpty = require('../isEmpty')
const Validator = require('validator')

const validateRegisterInputs = data => {
    let errors = {}
    data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.cpf = !isEmpty(data.cpf) ? data.cpf : '';
    data.data = !isEmpty(data.data) ? data.data : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.fullName, { min: 2, max: 30 })) {
        errors.fullName = 'Nome deve conter de 2 à 30 caractéres';
    }

    if (Validator.isEmpty(data.fullName)) {
        errors.fullName = 'Nome é obrigatório';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email inválido';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email é obrigatório';
    }


    if (Validator.isEmpty(data.cpf)) {
        errors.cpf = 'CPF é obrigatório';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Ano é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

module.exports = validateRegisterInputs
