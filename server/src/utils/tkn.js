const jwt = require('./jwt');
const secret = 'dasdsaudfgqwuey31ou31413rasadtewt';

function generateToken(user) {
   console.log(`${user} 5 red`);

   const payload = {
      _id: user._id, email: user.email, name: user.name, role: user.role
   };
   // console.log(`${payload} 10 red`);
   
   return jwt.sign(payload, secret, { expiresIn: '3h' });
};

module.exports = generateToken;