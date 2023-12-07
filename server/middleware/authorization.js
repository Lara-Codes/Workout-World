/* B"H
*/

const usersModel = require('../models/users');
const activitiesModel = require('../models/activities')

module.exports = {
  async parseAuthorizationToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return next();
    }
    const payload = await usersModel.verifyJWT(token);
    req.user = payload;
    next();
  },
  requireUser(adminOnly = false){
    return function(req, res, next) {
      if (!req.user) {
        return next({
          status: 401,
          message: 'You must be logged in to perform this action.'
        });
      }
      if (adminOnly && req.user.role !== 'admin') {
        return next({
          status: 403,
          message: 'You must be an admin to perform this action.'
        });
      }
      next();
    }
  },
}