exports.homePage = (req, res) => {
    res.render('index', {name: req.name})
}

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' })
}

exports.createStore = (req, res) => {
    console.log(req.body)
    res.json(req.body)
}