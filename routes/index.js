module.exports =app => {
    app.use('/api/users', require ('./users'))
    app.use('/api/estate', require ('./estate'))
}
