import React from 'react'
import { connect } from 'react-redux'
import { changeDrawerVisible } from '../../../store/actions/drawerAction'
import { App } from '../components/Drawer/App'

export class Drawer extends React.Component {
    handleClickCloseDrawer = () => this.props.changeDrawerVisible(false)

    render() {
        const { data, targetMenu, targetInn, visible } = this.props

        let dataInn = {}
        let period
        const d = targetMenu && targetMenu.match(/plan/) && data[targetMenu.match(/[0-9]+/)[0]]
        d &&
            d['data'].forEach((item, i) =>
                item.forEach(it => {
                    if (+it['inn'] === +targetInn) {
                        dataInn = it
                        period = d['period'][i]
                    }
                })
            )

        return (
            <>
                <App
                    data={dataInn}
                    period={period}
                    visible={visible}
                    handleClickCloseDrawer={this.handleClickCloseDrawer}
                />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.fetchReducer,
        ...store.targetMenuReducer,
        ...store.targetInnReducer,
        ...store.drawerReducer
    }
}

const mapDispatchToProps = {
    changeDrawerVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
