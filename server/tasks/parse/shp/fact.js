// Парсить данные из shp и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const INDEXES = require(appRoot + '/server/config/shp/fact')
const {
    INDEXES_STAMPING,
    INDEXES_RUNNING,
    INDEXES_GRINDING,
    INDEXES_ROUGH,
    INDEXES_CLEAN,
    INDEXES_FINAL
} = INDEXES

const convertData = require(appRoot + '/server/tasks/shp/convertFact/').convertData
const convertTechnologyFact = require(appRoot + '/server/tasks/shp/convertTechnologyFact/')
const convertTechnologyFactData = require(appRoot + '/server/tasks/shp/convertTechnologyFactData/')
const qualityProduction = require(appRoot + '/server/tasks/shp/qualityProduction/')
const joinTechnologyFactAPI = require(appRoot + '/server/requests/api/joinTechnologyFactAPI')
const qualityProductionAPI = require(appRoot + '/server/requests/api/qualityProductionAPI')
const intervalAPI = require(appRoot + '/server/requests/api/intervalAPI')
const mtimeAPI = require(appRoot + '/server/requests/api/mtimeAPI')

module.exports = function ({ app, parseShpFact, technology }) {
    fs.readdir(parseShpFact, function (err, files) {
        const paths = files.map((item) => `${parseShpFact}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function (resolve, reject) {
                let stamping, running, grinding, rough, clean, final

                xlsx.parse(`${paths[i]}`).forEach((sheet) => {
                    if (sheet['name'].toLowerCase() === 'штамповка')
                        stamping = convertData(sheet['data'], INDEXES_STAMPING)
                    if (sheet['name'].toLowerCase() === 'обкатка')
                        running = convertData(sheet['data'], INDEXES_RUNNING)
                    if (sheet['name'].toLowerCase() === 'шлифовка')
                        grinding = convertData(sheet['data'], INDEXES_GRINDING)
                    if (sheet['name'].toLowerCase() === 'доводка1')
                        rough = convertData(sheet['data'], INDEXES_ROUGH)
                    if (sheet['name'].toLowerCase() === 'доводка3')
                        clean = convertData(sheet['data'], INDEXES_CLEAN)
                    if (sheet['name'].toLowerCase() === 'доводка4')
                        final = convertData(sheet['data'], INDEXES_FINAL)
                })

                const fact = {
                    stamping,
                    running,
                    grinding,
                    rough,
                    clean,
                    final
                }

                if (technology && fact) {
                    // Совмещена технология и факт
                    const joinTechnologyFact = convertTechnologyFact({ technology, fact })
                    // Добавлены данные для построения графиков
                    const joinTechnologyFactData = convertTechnologyFactData({ joinTechnologyFact })
                    resolve(
                        (() => {
                            joinTechnologyFactAPI({
                                app,
                                joinTechnologyFact: joinTechnologyFactData
                            })

                            // Градация
                            intervalAPI({ app })

                            // Дата последнего изменения файла
                            fs.stat(parseShpFact, (err, stat) => {
                                const mtime = stat['mtime']
                                mtimeAPI({ app, mtime })
                                // Сведения о состоянии производственных процессов:
                                // realTime - только действующие
                                // remember - только завершенные
                                // all - все
                                // Для построения осевого графика и итоговых таблиц
                                const [realTime, remember, all] = qualityProduction({
                                    joinTechnologyFact,
                                    mtime
                                })
                                qualityProductionAPI({
                                    app,
                                    realTime,
                                    remember,
                                    all
                                })
                            })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch((err) => console.log(err))
        }
    })
}
