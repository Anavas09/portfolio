const Portfolio = require('../models/portfolio')

exports.getPortfolios = (req, res) => {

  Portfolio.find({}).sort({'startDate': 1})
                    .exec((err, allPortfolios) => {
    if (err){
      return res.status(422).send(err)
    }

    return res.json(allPortfolios)
  })
}

exports.savePortfolio = (req, res) => {
  const portfolioData = req.body;

  const userId = req.user && req.user.sub;

  const portfolio = new Portfolio(portfolioData);
  portfolio.userId = userId;

  portfolio.save((err, createdPortfolio) => {
    if (err){
      console.error(err.message)
      return res.status(422).send(err.message)
    }

    return res.json(createdPortfolio)
  })
}

exports.updatePortfolio = (req, res) => {
  const portfolioId = req.params.id;
  const portfolioData = req.body;

  // Portfolio.findByIdAndUpdate(portfolioId, portfolioData, {useFindAndModify: true}, (err, updatedPortfolio) => {
  //   if (err){
  //     return res.status(422).send(err)
  //   }

  //   return res.json(updatedPortfolio)
  // })

  Portfolio.findById(portfolioId, (err, foundPortfolio) => {
    if (err){
      return res.status(422).send(err)
    }

    foundPortfolio.set(portfolioData)
    foundPortfolio.save((err, savedPortfolio) => {
      if (err){
        return res.status(422).send(err)
      }

      return res.json(foundPortfolio)
    })
  })
}

exports.deletePortfolio = (req, res) => {
  const portfolioId = req.params.id;

  Portfolio.deleteOne({_id: portfolioId}, (err, deletedPortfolio) => {
    if (err){
      return res.status(422).send(err)
    }

    return res.json({status: 'DOCUMENT DELETED'})
  })
}

exports.getPortfolioById = (req, res) => {
  const portfolioId = req.params.id;

  Portfolio.findById(portfolioId, (err, foundPortfolio) => {
    if (err){
      return res.status(422).send(err)
    }
    
    return res.json(foundPortfolio)
  })

}