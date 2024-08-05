const { CREATED,OK, SuccessResponse } = require('../core/succes.response');
const AccessService = require('../services/access.service');
class AccessController { 

    logout = async (req, res,next) => {
            new SuccessResponse({
                message:'Logout success!',
                metadata :await AccessService.logout(req.keyStore),
            }).send(res)
    }


    login = async (req, res,next) => {
        const {email, password} = req.body;
            new SuccessResponse({
                metadata :await AccessService.login({email, password}),
            }).send(res)
    }

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Registed OK!',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10
            }
        }).send(res)
    }
} 

module.exports = new AccessController;