const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const authUtils = require('../auth/authUtils');
const {getInfoData} = require('../utils/index')
const RoleShop = {
    ADMIN: '0000',//0000 is the role for admin
    SHOP: '0001',//0001 is the default role for shop
    WRITER: '0002',//0002 is the role for writer
    EDITOR: '0003',//0003 is the role for editor
}
class AccessService {

    static signUp = async ({name, email, password}) => {
        try {
            //check if email already exists
            const holderShop = await shopModel.findOne({email}).lean()
            if(holderShop){
                return { 
                    code: 'xxxx',
                    message: 'Shop already registered',
                    status: 'error'
               }
            }
            const passwordHashed = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create(

                {name, email, password: passwordHashed,roles: [RoleShop.SHOP]}
            );
           if(newShop){
                //created privateKey, publicKey
                const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                      },
                    
                })

                // console.log('privateKey:', privateKey);
                // console.log('publicKey:', publicKey);
                
                //save privateKey, publicKey collection KeyStore
                 const publicKeyString = await KeyTokenService.createKeyToken(
                    {userId: newShop._id, 
                    publicKey
                });
                if(!publicKeyString){
                    return {
                        code: 'xxxx',
                        message: 'Error creating publicKey',
                        status: 'error'
                    }
                }

                const publicKeyObject = crypto.createPublicKey( publicKeyString )
                
                //created token pair
                const tokens =  await authUtils.createTokenPair(
                    {userId: newShop._id,email},
                    publicKeyObject,
                    privateKey
                );
                
                // console.log('Created Token Success::', tokens);

                return {
                    code: 201,
                    metadata: {
                        shop : getInfoData({fileds: ['_id','name','email'],object: newShop}),
                        tokens
                    }
                }
            }
        }catch (error) {
           return { code: 'xxx',
            message: error.message,
            status: 'error'
           }
        }
    }
}

module.exports = AccessService;