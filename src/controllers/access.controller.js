const AccessService = require('../services/access.service');
class AccessController { 
    signUp = async (req, res,next) => {
        try {
            console.log('[P]::signUp::', req.body);
            const {name, email, password} = req.body;
            const result = await AccessService.signUp({name, email, password});
            console.log('[P]::signUp::result::', result);
            return res.status(201).json({
                code: '20001',
                metadata: {userid :1}
            });
        } catch (error) {
            
        }
    }
}

module.exports = new AccessController;