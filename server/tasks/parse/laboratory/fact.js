// Парсить данные из parse и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const laboratoryAPI = require('../../../api/laboratoryAPI')
const calculateData = require('../../laboratory/helpers/')

module.exports = function({ app, parseLaboratoryFact, technology }) {
    fs.readdir(parseLaboratoryFact, function(err, files) {
        const paths = files.map(item => `${parseLaboratoryFact}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const fact = xlsx.parse(`${paths[i]}`)[0].data
                if (technology && fact) {
                    const data = calculateData({ fact, technology })

                    resolve(
                        (() => {
                            laboratoryAPI({ app, data })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch(err => console.log(err))
        }
    })
}
