const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const {createTokenPair} = require('../auth/authUtils');
const {getInfoData} = require('../utils/index');
const { BadRequestError, ConflictRequestError, AuthFailureError } = require('../core/error.response');
const { findByEmail } = require('./shop.service');
const RoleShop = {
    ADMIN: '0000',//0000 is the role for admin
    SHOP: '0001',//0001 is the default role for shop
    WRITER: '0002',//0002 is the role for writer
    EDITOR: '0003',//0003 is the role for editor
}
class AccessService {


    static login = async ({ email, password, refreshToken = null }) => {
        //1.check email in dbs
        const foundShop = await findByEmail({ email })
        if (!foundShop) throw new BadRequestError('Shop not registered')

        //2.match password
        const match = bcrypt.compare(password, foundShop.password)
        if (!match) throw new AuthFailureError("Authentication error")

        //3.create AT vs RT and save
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        //4. generate tokens
        const {_id: userId} = foundShop
        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey, publicKey, userId
        })

        //5. get data and return 

        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }

    }

    static signUp = async ({ name, email, password }) => {
        // try {
        //step1: check email exist
        const holderShop = await shopModel.findOne({ email }).lean()
        if (holderShop) {
            throw new BadRequestError('Error: Shop already registed!')

        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })

        if (newShop) {
            //created privateKey, publicKey
            // const { privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1', //pkcs8 //Public key CryptoGraphy Standards
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     }
            // })
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')



            console.log({ privateKey, publicKey }) //save collection KeyStore

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })

            if (!keyStore) {
                //throw new BadRequest('Error: Shop already registed!')

                return {
                    code: 'xxxx',
                    message: 'keyStore error'
                }

            }
            //created token pair
            const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
            console.log(`Created Token Success::`, tokens)

            return {
                shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                tokens
            }
        }
        return {
            code: '200',
            metadata: null
        }
    }
}

module.exports = AccessService; 