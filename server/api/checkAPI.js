// Отправить данные к '/api/check/наименование производства'

module.exports.checkForGeneralUse = function({ app, checkForGeneralUse, name }) {
    app.get(`/api/checkForGeneralUse/${name}`, function(req, res) {
        res.json(checkForGeneralUse)
        console.log(`Данные отправлены на /api/checkForGeneralUse/${name}`)
    })
}

module.exports.converted = function({ app, convertedData, name }) {
    app.get(`/api/checkForAntd/${name}`, function(req, res) {
        res.json(convertedData)
        console.log(`Данные отправлены на /api/checkForAntd/${name}`)
    })
}
