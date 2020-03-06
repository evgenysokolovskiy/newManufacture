// Парсить данные из shp и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const convertTechnology = require('../../shp/convertTechnology/conv')
const INDEXES = require('../../../config/shp/technology')
const {
    INDEXES_STAMPING,
    INDEXES_RUNNING,
    INDEXES_GRINDING,
    INDEXES_ROUGH,
    INDEXES_CLEAN,
    INDEXES_FINAL
} = INDEXES

module.exports = function({ app, parseShpTechnology }) {
    fs.readdir(parseShpTechnology, function(err, files) {
        const paths = files.map(item => `${parseShpTechnology}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                let stamping, running, grinding, rough, clean, final

                const data = xlsx.parse(`${paths[i]}`)[0].data

                stamping = convertData(data, INDEXES_STAMPING)
                running = convertData(data, INDEXES_RUNNING)
                grinding = convertData(data, INDEXES_GRINDING)
                rough = convertData(data, INDEXES_ROUGH)
                clean = convertData(data, INDEXES_CLEAN)
                final = convertData(data, INDEXES_FINAL)

                const technology = {
                    stamping,
                    running,
                    grinding,
                    rough,
                    clean,
                    final
                }

                const d = convertTechnology({ technology })

                //const convertedData = convertFact({ data })

                if (technology) {
                    resolve(
                        //console.log(stamping)
                        /*
                        (() => {
                            // Отправить факт к API
                            shpFactAPI({ app, data: convertedData })
                        })()
                        */
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch(err => console.log(err))
        }
    })
}


function convertData(data, INDEXES) {
    let arr = []
    // Преобразовать объект в массив
    const indexes = [...Object.entries(INDEXES)]
    data.forEach(item => {
        if (!item[0]) return
        const obj = {}
        indexes.forEach(i => {
            const indexDate = (i[0] === 'date') ? i[1] : null
            obj[i[0]] = typeof item[indexDate] === 'number' ? getDateFromText(item[indexDate]) : item[i[1]]
        })
        arr = [...arr, obj]
    })
    return arr
}