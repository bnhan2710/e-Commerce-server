const AccessService = require('../services/access.service');
class AccessController { 
    signUp = async (req, res,next) => {
 
            const {name, email, password} = req.body;
            // console.log('[P]::signUp::result::', result);
            return res.status(201).json(await AccessService.signUp({name, email, password}));
    }
}

module.exports = new AccessController;