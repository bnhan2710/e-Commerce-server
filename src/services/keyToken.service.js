const { token } = require('morgan');
const keyTokenModel = require('../models/keyToken.model');

class  KeyTokenService {
    static createKeyToken = async({userId,publicKey,privateKey,refreshToken}) => {
        try { 
            //level 0
            // const publicKeyString = publicKey.toString();
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey:publicKeyString
            // });
            // return tokens ? tokens.publicKey : null;

            //level xx
            const filter = {user: userId}, update ={ publicKey,privateKey,refreshsTokenUsed: [], refreshToken}, 
            options = {upsert: true, new: true};
            
            const tokens = await keyTokenModel.findOneAndUpdate({filter, update, options}).lean();

            return tokens? tokens.publicKey : null;
        } catch (error) {
            return error
        }
    }

}

module.exports = KeyTokenService;