import clonedeep from 'lodash.clonedeep'
import {
    convertDateToString,
    convertStringToDate,
    convertStringToDateBatchLoadingTime
} from './calculateDates'

// Совместить технологию с фактом по нескольким картам
export function calculateDataFewCards({ technology, fact, card, cards, interval }) {
    // Интервал (дробная часть от единицы как количество минут от часа)
    // Необходимо для построения дробной части на сводном по нескольким картам графике
    const int = interval && +interval / 60

    let diameter = [],
        inconstancyDimension = [],
        pressureSpeed = []

    diameter = technology['pointsDiameter']

    for (let i = 0, date = 0; i < diameter.length; i++, date = date + int) {
        diameter[i]['date'] = date
    }

    for (let i = 0, date = 0; i < technology['pointsInconstancy'].length; i++, date = date + int) {
        const item = {
            inconstancy: technology['pointsInconstancy'][i],
            dimension: technology['pointsDimension'][i],
            date
        }
        inconstancyDimension[i] = item
    }

    for (let i = 0, date = 0; i < technology['pointsPressure'].length; i++, date = date + int) {
        const item = {
            pressure: technology['pointsPressure'][i],
            speed: technology['pointsSpeed'][i],
            speedElevator: technology['pointsSpeedElevator'][i],
            date
        }
        pressureSpeed[i] = item
    }

    cards['hasBatchLoadingTime'].forEach((card, index) => {
        if (card === 'Сводная') return
        const data = clonedeep(calculateDataOneCard({ technology, fact, card, interval }))

        for (let i = 0; i < diameter.length; i++) {
            if (data['diameter'][i]['fact']) {
                diameter[i][`fact${index}`] = replaceToDot(data['diameter'][i]['fact'])

                if (data['diameter'][i]['falseFact']) {
                    diameter[i][`falseFact${index}`] = replaceToDot(
                        data['diameter'][i]['falseFact']
                    )
                }

                if (data['diameter'][i]['trueFact']) {
                    diameter[i][`trueFact${index}`] = replaceToDot(data['diameter'][i]['trueFact'])
                }
            }
        }

        for (let i = 0; i < inconstancyDimension.length; i++) {
            if (data['inconstancyDimension'][i]['factInconstancy']) {
                inconstancyDimension[i][`factInconstancy${index}`] =
                    data['inconstancyDimension'][i]['factInconstancy']

                if (data['inconstancyDimension'][i]['factInconstancyFalse']) {
                    inconstancyDimension[i][`factInconstancyFalse${index}`] =
                        data['inconstancyDimension'][i]['factInconstancyFalse']
                }

                if (data['inconstancyDimension'][i]['factInconstancyTrue']) {
                    inconstancyDimension[i][`factInconstancyTrue${index}`] =
                        data['inconstancyDimension'][i]['factInconstancyTrue']
                }
            }

            if (data['inconstancyDimension'][i]['factDimension']) {
                inconstancyDimension[i][`factDimension${index}`] =
                    data['inconstancyDimension'][i]['factDimension']

                if (data['inconstancyDimension'][i]['factDimensionFalse']) {
                    inconstancyDimension[i][`factDimensionFalse${index}`] =
                        data['inconstancyDimension'][i]['factDimensionFalse']
                }

                if (data['inconstancyDimension'][i]['factDimensionTrue']) {
                    inconstancyDimension[i][`factDimensionTrue${index}`] =
                        data['inconstancyDimension'][i]['factDimensionTrue']
                }
            }
        }
    })

    return {
        diameter,
        inconstancyDimension,
        pressureSpeed
    }
}

// Совместить технологию с фактом по одной карте
export function calculateDataOneCard({ technology: t, fact: f, card, interval }) {
    if (card === 'Сводная') return
    const technology = clonedeep(t)
    const fact = clonedeep(f)
    const {
        pointsDiameter,
        pointsInconstancy,
        pointsDimension,
        pointsPressure,
        pointsSpeed,
        pointsSpeedElevator
    } = technology

    // 1) Получить дату факта: конкатенировать дату и время как строку
    // Конвертировать конкатенированную дату в миллисекунды
    // Записать свойство convertFactJointDate['jointDate'], которое будет отображать дату фактического действия в миллисекундах
    const convertFactJointDate =
        fact &&
        card &&
        fact[card].map(item => {
            const date = convertStringToDate(item)
            item['jointDate'] = date
            return item
        })

    // Определить временную отметку начала построения технологии в миллисекундах
    // Соответствует временной отметке загрузки

    // 2) Определить временную отметку загрузки (определена как string)
    let batchLoadingTime
    convertFactJointDate &&
        convertFactJointDate.forEach(item => {
            if (item['batchLoadingTime']) batchLoadingTime = item['batchLoadingTime']
        })

    // 3) Преобразовать string в Date (в миллисекундах)
    let start = convertStringToDateBatchLoadingTime(batchLoadingTime)

    // Количество часов по технологии
    const len = pointsDiameter.length

    // 4) Определить временные отметки от начальной отметки start до конечной на расстоянии длины len

    // Интервал между отметками составляет заданный интервал intervalMilliseconds в миллисекундах
    let arr = [start]
    // interval - количество минут (30 - полчаса)
    // 60000 - количество миллисекунд в одной минуте
    // 1800000 - полчаса
    // 3600000 - час
    const intervalMilliseconds = interval && +interval * 60000

    for (let i = 1; i < len; i++) {
        start = start + intervalMilliseconds
        arr = [...arr, start]
    }

    // 5) Получить новые массивы, дополненные date в миллисекундах
    // Диаметр
    const pointsDiameterDate = [...pointsDiameter].map((item, i) => {
        item['date'] = arr[i]
        return item
    })

    // Непостоянство, разноразмерность (предварительно объединить в один массив)
    let pointsInconstancyDimension = []
    for (let i = 0; i < pointsInconstancy.length; i++) {
        const item = {
            inconstancy: pointsInconstancy[i],
            dimension: pointsDimension[i]
        }

        pointsInconstancyDimension = [...pointsInconstancyDimension, item]
    }

    const pointsInconstancyDimensionDate = [...pointsInconstancyDimension].map((item, i) => {
        item['date'] = arr[i]
        return item
    })

    // Давление, скорость (предварительно объединить в один массив)
    let pointsPressureSpeed = []
    for (let i = 0; i < pointsPressure.length; i++) {
        const itemPressureSpeed = {
            pressure: pointsPressure[i],
            speed: pointsSpeed[i],
            speedElevator: pointsSpeedElevator[i]
        }
        pointsPressureSpeed = [...pointsPressureSpeed, itemPressureSpeed]
    }

    const pointsPressureSpeedDate = [...pointsPressureSpeed].map((item, i) => {
        item['date'] = arr[i]
        return item
    })

    // 6) Добавить факт к массивам с дополненной датой
    // Диаметр
    // Определить среднее значение норматива для последней временной отметки технологии
    const lastElemDiameterNorm = pointsDiameterDate[pointsDiameterDate.length - 1]['norm']
    const factLastElemDiameter = lastElemDiameterNorm[0] + (lastElemDiameterNorm[1] - lastElemDiameterNorm[0]) / 2

    const diameter = [...pointsDiameterDate].map(technology => {
        convertFactJointDate &&
            [...convertFactJointDate].forEach(fact => {
                if (technology['date'] === fact['jointDate']) {
                    const factDiameter = replaceToDot(fact['diameter'])
                    // 'fact' необходим для построения линейного графика, соединяющего точки
                    technology['fact'] = +factDiameter
                    // 'trueFact' и 'falseFact' необходимы для построения точек
                    factDiameter > technology['norm'][0] && factDiameter < technology['norm'][1]
                        ? (technology['trueFact'] = factDiameter)
                        : (technology['falseFact'] = factDiameter)
                }
            })
        technology['date'] = convertDateToString(technology['date'])
        return technology
    })


    convertFactJointDate &&
        [...convertFactJointDate].forEach(fact => {
            if (fact['qualityProducts']) diameter[diameter.length - 1]['fact'] = factLastElemDiameter
        })

    // Непостоянство, разноразмерность
    const inconstancyDimension = [...pointsInconstancyDimensionDate].map(technology => {
        convertFactJointDate &&
            [...convertFactJointDate].forEach(fact => {
                if (technology['date'] === fact['jointDate']) {
                    // Непостоянство
                    const factInconstancy = fact['inconstancy']
                    technology['factInconstancy'] = factInconstancy
                    factInconstancy > technology['inconstancy']
                        ? (technology['factInconstancyFalse'] = factInconstancy)
                        : (technology['factInconstancyTrue'] = factInconstancy)

                    // Разноразмерность
                    const factDimension = fact['dimension']
                    technology['factDimension'] = factDimension
                    factDimension > technology['dimension']
                        ? (technology['factDimensionFalse'] = factDimension)
                        : (technology['factDimensionTrue'] = factDimension)
                }
            })

        technology['date'] = convertDateToString(technology['date'])
        return technology
    })

    // Давление, скорость
    const pressureSpeed = [...pointsPressureSpeedDate].map(technology => {
        convertFactJointDate &&
            [...convertFactJointDate].forEach(fact => {
                if (technology['date'] === fact['jointDate']) {
                    // Давление
                    const factPressure = fact['pressure']
                    technology['factPressure'] = factPressure
                    factPressure > technology['pressure']
                        ? (technology['factPressureFalse'] = factPressure)
                        : (technology['factPressureTrue'] = factPressure)

                    // Скорость
                    const factSpeed = fact['speed']
                    technology['factSpeed'] = factSpeed
                    factSpeed > technology['speed']
                        ? (technology['factSpeedFalse'] = factSpeed)
                        : (technology['factSpeedTrue'] = factSpeed)

                    // Скорость элеватора
                    const factSpeedElevator = fact['speedElevator']
                    technology['factSpeedElevator'] = factSpeedElevator
                    factSpeedElevator > technology['speedElevator']
                        ? (technology['factSpeedElevatorFalse'] = factSpeedElevator)
                        : (technology['factSpeedElevatorTrue'] = factSpeedElevator)
                }
            })

        technology['date'] = convertDateToString(technology['date'])
        return technology
    })

    return {
        diameter,
        inconstancyDimension,
        pressureSpeed
    }
}

function replaceToDot(str) {
    const newStr = typeof str === 'string' ? str.replace(',', '.') : str
    return +newStr
}
