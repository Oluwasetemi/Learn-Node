const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
    req.flash('warning', `a very fatal error`)
    req.flash('error', `a very fatal error`)
    req.flash('info', `a very fatal error`)
    req.flash('success', `a very fatal error`)
    req.flash('me  away', `a very fatal error`)
    req.flash('info', `a very fatal error`)
    res.render('index', {name: req.name})
}

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' })
}

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save()
    req.flash('success', `Successfully created ${store.name}. Care to leave a Review?`)
    res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
    const stores = await Store.find()
    console.log(stores)
    res.render('stores', { title: 'Stores', stores })
}