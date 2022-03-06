/*
 * 
 * This file is middleware that runs before all api calls
 * It checks if the openAPIDocumenation.yml requires a cookie
 * If the request modifies a user the userId in cookie is also verified
 * 
 */
module.exports = (req, res, next) => {
    const { operation } = req.enforcer
    if (operation.security !== undefined){
        const sessionIsRequired = operation.security.find(obj => obj.cookieAuth !== undefined)
        if(sessionIsRequired){
            if (req.user){
                // Check for authorization
                if(req.enforcer.params.userId) {
                    if (req.enforcer.params.userId === req.user._id.toString()){
                        next()
                    }
                    else {
                        res.status(401).send()
                    }
                }
                else {
                    next()
                } 
            } 
            else {
                res.status(401).send()
            }
        }
        else {
           next()
        }
    }
    else {
        next()
    } 

}