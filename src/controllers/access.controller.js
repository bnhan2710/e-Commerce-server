const { CREATED,OK } = require('../core/succes.response');
const AccessService = require('../services/access.service');
class AccessController { 
    signUp = async (req, res,next) => {
        const {name, email, password} = req.body;
        // console.log('[P]::signUp::result::', result);
            new CREATED({
                message: 'Register successfully',
                metadata :await AccessService.signUp({name, email, password}),
                option: {
                    limit: 10
                }
            }).send(res)
    }
} 

module.exports = new AccessController;