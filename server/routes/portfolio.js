const express = require('express');
const router = express.Router();

const authServices = require('../middlewares/auth');

const portfolioCtrl = require('../controllers/portfolio');

const { checkRole, checkScopes, jwtCheck } = authServices;

router.post('', jwtCheck, checkScopes, checkRole('siteOwner'), portfolioCtrl.savePortfolio);

router.get('', portfolioCtrl.getPortfolios);

router.get('/:id', portfolioCtrl.getPortfolioById)

router.patch('/:id', jwtCheck, checkScopes, checkRole('siteOwner'), portfolioCtrl.updatePortfolio)

router.delete('/:id', jwtCheck, checkScopes, checkRole('siteOwner'), portfolioCtrl.deletePortfolio)

module.exports = router;