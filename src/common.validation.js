const{InvalidArgumentError} = require('./error')

module.exports= {
    stringNotNull: (valor,name)=>{
        if (typeof valor != 'string' || valor === 0)
         throw new InvalidArgumentError(`It's necessary to fill the field ${name}!`)

    },

    minimumSize: (valor,name,minimum)=>{
        if (valor.lengt< minimum)
        throw new InvalidArgumentError(
            `The field ${name} must longer than ${minimum} characters!`

        )
    },

    maximumSize: (valor,name,maximum)=>{
        if (valor.lengt> maximum)
        throw new InvalidArgumentError(
            `The field ${name} must be less than ${maximum} characters!`
        )
    }
}