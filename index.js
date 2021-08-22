const Joi = require('joi');

const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        repeat_password: Joi.ref('password'),

        access_token: [
            Joi.string(),
            Joi.number()
        ],

        birth_year: Joi.number()
            .integer()
            .min(1900)
            .max(2013),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -


const validateData = async() => {
    try {
        const value = await schema.validateAsync({
            username: 'abc',
            password: 'abc123',
            repeat_password: 'abc123',
            birth_year: 1994
        });
        console.log('Value: ', value);
    } catch (err) {
        console.error('Welcome to error: ', err);
    }

    const schema2 = Joi.date()
        .min('12-1-2015')
        .max('12-31-2015')
        .iso();
    try {
        Joi.assert('2015-14-01', schema2);
    } catch (err) {
        console.error('Welcome to error: ', err);
    }


}
validateData();



// console.log(schema2.validate());