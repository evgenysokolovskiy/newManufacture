import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clonedeep from 'lodash.clonedeep'
import App from '../components/Content/App'
import calculateDataShp from '../helpers/shp/'

// fetch
import { fetchLabAllMiddleware } from '../../../../api/middlewares/fetchLabAllMiddleware'
import { fetchLabPercentMiddleware } from '../../../../api/middlewares/fetchLabPercentMiddleware'
import { fetchLabAmountMiddleware } from '../../../../api/middlewares/fetchLabAmountMiddleware'
import { fetchLabSourceMiddleware } from '../../../../api/middlewares/fetchLabSourceMiddleware'
// actions
import { changeLabTargetMenu } from '../../../../store/laboratory/actions/labTargetMenuAction'
import { changeAll } from '../../../../store/laboratory/actions/labAllAction'
import { changePercent } from '../../../../store/laboratory/actions/labPercentAction'
import { changeAmount } from '../../../../store/laboratory/actions/labAmountAction'
import { changeSource } from '../../../../store/laboratory/actions/labSourceAction'
import { changeParam } from '../../../../store/laboratory/actions/labParamAction'
import { changeProp } from '../../../../store/laboratory/actions/labPropAction'
import { changeEquipmentNumber } from '../../../../store/laboratory/actions/labEquipmentNumberAction'
import { changeRangeDate } from '../../../../store/laboratory/actions/labChangedRangeDateAction'
// URLs
import {
    laboratoryAllShp,
    laboratoryPercentShp,
    laboratoryAmountShp,
    laboratorySourceShp,
    laboratoryAllShsp,
    laboratoryPercentShsp,
    laboratoryAmountShsp,
    laboratorySourceShsp,
    laboratoryAllSog,
    laboratoryPercentSog,
    laboratoryAmountSog,
    laboratorySourceSog
} from '../../../../api/urls/data'

export class Content extends PureComponent {
    state = {
        isLoadedAll: false,
        isLoadedPercent: false,
        isLoadedAmount: false,
        isLoadedSource: false
    }
    /*
    componentDidUpdate(prevProps) {
        const { labMenu: menu, labSource: source, labParam: param, labProp: prop, changeParam, changeProp } = this.props
        if (source && prevProps.source !== source) {
            const par = Object.keys(source)[0]
            changeParam(par)
            changeProp(Object.keys(source[par])[0])
        }
    }
*/

    // Событие по меню (выбора процедуры)
    handleClickMenu = item => {
        const {
            fetchLabAmountMiddleware,
            fetchLabPercentMiddleware,
            fetchLabSourceMiddleware,
            fetchLabAllMiddleware,
            changeLabTargetMenu
        } = this.props

        if (item === 'shp') {
            fetchLabAmountMiddleware(laboratoryAmountShp, this)
            fetchLabPercentMiddleware(laboratoryPercentShp, this)
            fetchLabSourceMiddleware(laboratorySourceShp, this)
            fetchLabAllMiddleware(laboratoryAllShp, this)
        }

        if (item === 'shsp') {
            fetchLabAmountMiddleware(laboratoryAmountShsp, this)
            fetchLabPercentMiddleware(laboratoryPercentShsp, this)
            fetchLabSourceMiddleware(laboratorySourceShsp, this)
            fetchLabAllMiddleware(laboratoryAllShsp, this)
        }

        if (item === 'sog') {
            fetchLabAmountMiddleware(laboratoryAmountSog, this)
            fetchLabPercentMiddleware(laboratoryPercentSog, this)
            fetchLabSourceMiddleware(laboratorySourceSog, this)
            fetchLabAllMiddleware(laboratoryAllSog, this)
        }

        changeLabTargetMenu(item)

        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedAll: false,
            isLoadedPercent: false,
            isLoadedAmount: false,
            isLoadedSource: false
        })
    }

    handleClickAmount = e => {
        const {
            labTargetMenu: menu,
            labAmount,
            fetchLabAmountMiddleware,
            fetchLabPercentMiddleware
        } = this.props
        if (menu && menu === 'shp') {
            if (e === 'amount') fetchLabAmountMiddleware(laboratoryAmountShp, this)
            if (e === 'percent') fetchLabPercentMiddleware(laboratoryPercentShp, this)
        }

        if (menu && menu === 'shsp') {
            if (e === 'amount') fetchLabAmountMiddleware(laboratoryAmountShsp, this)
            if (e === 'percent') fetchLabPercentMiddleware(laboratoryPercentShsp, this)
        }

        if (menu && menu === 'sog') {
            if (e === 'amount') fetchLabAmountMiddleware(laboratoryAmountSog, this)
            if (e === 'percent') fetchLabPercentMiddleware(laboratoryPercentSog, this)
        }

        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedAll: false,
            isLoadedPercent: false,
            isLoadedAmount: false
        })
    }

    handleClickParam = item => {
        this.props.changeParam(item)
        this.props.changeEquipmentNumber('Сводная')
    }

    handleClickProp = item => {
        this.props.changeProp(item)
        this.props.changeEquipmentNumber('Сводная')
    }

    handleClickEquipment = item => {
        this.props.changeEquipmentNumber(item)
    }

    handleClickRangeDate = range => {
        const {
            labAll,
            changeAll,
            changePercent,
            changeAmount,
            changeSource,
            changeRangeDate
        } = this.props

        const defaultData = clonedeep(labAll['default'])
        const technology = defaultData['technology']
        const startDate = labAll['default']['defaultStart']
        const dateIndex = defaultData['dateIndex']
        const data =
            defaultData['data'] && defaultData['data'].filter(item => item[dateIndex] > range[0])
        const current = calculateDataShp({ fact: data, technology, startDate: range[0] })

        changePercent(current['percent'])
        changeAmount(current['amount'])
        changeSource(current['source'])
        changeAll({ default: defaultData, current })
        changeRangeDate(range)

        Object.entries(current['source']).forEach(item => {
            if (Object.keys(item[1])[0]) {
                this.props.changeParam(item[0])
                this.props.changeProp(Object.keys(item[1])[0])
            }
        })
    }

    render() {
        const {
            labAll: all,
            labPercent: percent,
            labAmount: amount,
            labSource: source,
            labTargetMenu: menu,
            labParam: param,
            labProp: prop,
            labEquipmentNumber: equipment,
            labChangedRangeDate: range
        } = this.props
        const { isLoadedAll, isLoadedPercent, isLoadedAmount, isLoadedSource } = this.state

        const rowTotal = {}
        amount &&
            Object.entries(amount).forEach(item => {
                let t = 0
                let f = 0
                rowTotal[item[0]] = {}

                Object.values(item[1]).forEach(val => {
                    t += val['true']
                    f += val['false']
                })

                rowTotal[item[0]]['true'] = t
                rowTotal[item[0]]['false'] = f
                rowTotal[item[0]]['percentTrue'] = ((t / (t + f)) * 100).toFixed()
            })

        const columnTotal = {}
        amount &&
            Object.values(amount).forEach(item => {
                Object.entries(item).forEach(val => {
                    if (!columnTotal[val[0]]) columnTotal[val[0]] = { true: 0, false: 0 }
                    columnTotal[val[0]]['true'] += val[1]['true']
                    columnTotal[val[0]]['false'] += val[1]['false']
                    columnTotal[val[0]]['percentTrue'] = (
                        (columnTotal[val[0]]['true'] /
                            (columnTotal[val[0]]['true'] + columnTotal[val[0]]['false'])) *
                        100
                    ).toFixed()
                })
            })

        return (
            <App
                menu={menu}
                range={range}
                param={param}
                prop={prop}
                equipment={equipment}
                percent={percent}
                amount={amount}
                source={source}
                rowTotal={rowTotal}
                columnTotal={columnTotal}
                isLoadedAll={isLoadedAll}
                isLoadedPercent={isLoadedPercent}
                isLoadedAmount={isLoadedAmount}
                isLoadedSource={isLoadedSource}
                handleClickMenu={this.handleClickMenu}
                handleClickAmount={this.handleClickAmount}
                handleClickParam={this.handleClickParam}
                handleClickProp={this.handleClickProp}
                handleClickEquipment={this.handleClickEquipment}
                handleClickRangeDate={this.handleClickRangeDate}
            />
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.labAllReducer,
        ...store.labPercentReducer,
        ...store.labAmountReducer,
        ...store.labSourceReducer,
        ...store.labTargetMenuReducer,
        ...store.labParamReducer,
        ...store.labPropReducer,
        ...store.labEquipmentNumberReducer,
        ...store.labChangedRangeDateReducer
    }
}

const mapDispatchToProps = {
    fetchLabAllMiddleware,
    fetchLabPercentMiddleware,
    fetchLabAmountMiddleware,
    fetchLabSourceMiddleware,
    changeLabTargetMenu,
    changeAll,
    changePercent,
    changeAmount,
    changeSource,
    changeParam,
    changeProp,
    changeEquipmentNumber,
    changeRangeDate
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
