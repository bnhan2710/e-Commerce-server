const jwt = require('jsonwebtoken');
const createTokenPair = async (payload,publicKey,privateKey) =>{
    try {
      
        //access token
        const accessToken = jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '1d'});
      
        //refresh token
        const refreshToken = jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '7d'});
        
        jwt.verify(accessToken, publicKey,(err,decoded) => {
            if(err)
                console.error('Error verify accessToken:', err);
            else
                console.log('decoded:', decoded);
        });

        return {accessToken, refreshToken};
    } catch (error) {
        return error
    }
}

module.exports = {
    createTokenPair
}