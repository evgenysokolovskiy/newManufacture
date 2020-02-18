import React, { Suspense, lazy } from 'react'
// Компоненты
import MenuComponent from './MenuComponent'
// Antd
import { Layout, Table, Tabs, Icon } from 'antd'

const { Content } = Layout
const { TabPane } = Tabs
const ChartComponent = lazy(() => import('./ChartComponent'))

// Диаметр шара
const diameter = [
    '3,175',
    '3,969',
    '4,000',
    '4,763',
    '5,000',
    '5,159',
    '5,336',
    '5,953',
    '6,000',
    '6,350',
    '6,747',
    '7,000',
    '7,144',
    '7,938',
    '8,731',
    '9,000',
    '9,128',
    '9,525',
    '10,000',
    '10,319',
    '10,716',
    '11,112',
    '11,509',
    '11,906',
    '12,303',
    '12,700',
    '13,494',
    '14,288',
    '15,081',
    '15,875',
    '16,669',
    '17,462',
    '18,256',
    '19,050',
    '19,844',
    '20,638',
    '21,431',
    '22,225',
    '23,019',
    '23,812',
    '24,606',
    '25,400',
    '26,194',
    '26,988',
    '27,781',
    '28,575',
    '30,162',
    '31,750',
    '33,338',
    '34,925',
    '36,512',
    '38,100',
    '39,688',
    '40,000',
    '41,275',
    '44,450',
    '50,000',
    '50,800',
    '53,975',
    '60,000'
]

export const App = props => {
    const { techTargetMenu, handleClickMenu } = props

    const tabs = diameter.map(tab => (
        <TabPane tab={tab} key={tab}>
            {techTargetMenu && techTargetMenu === 'running' && (
                <Suspense
                    fallback={
                        <Icon
                            type="loading"
                            className="loading"
                            style={{ fontSize: '20px', color: 'red' }}
                        />
                    }
                >
                    <ChartComponent />
                </Suspense>
            )}
        </TabPane>
    ))

    return (
        <Content>
            <Layout
                style={{ /*padding: '24px 0',*/ background: '#fff' }}
                className="ant-layout-has-sider"
            >
                <MenuComponent handleClickMenu={handleClickMenu} />
                <Content style={{ /*padding: '0 24px',*/ minHeight: 280 }}>
                    <Tabs defaultActiveKey="3,175" type="card">
                        {tabs}
                    </Tabs>
                </Content>
            </Layout>
        </Content>
    )
}
