import React, { PureComponent } from 'react'
import { Statistic, Card, Row, Col, Typography, Icon } from 'antd'
const { Text } = Typography

export default class StatisticComponent extends PureComponent {
    render() {
        const {
            // Диаметр
            differenceDiameter,
            // Непостоянство
            differenceInconstancy,
            // Разноразмерность
            differenceDimension,
            // Давление
            differencePressure,
            // Скорость
            differenceSpeed
        } = this.props

        // Иконки стрелок
        const iconDifferenceDiameter =
            differenceDiameter > 0 ? 'arrow-up' : differenceDiameter < 0 ? 'arrow-down' : null
        const iconDifferenceInconstancy =
            differenceInconstancy > 0 ? 'arrow-up' : differenceInconstancy < 0 ? 'arrow-down' : null
        const iconDifferenceDimension =
            differenceDimension > 0 ? 'arrow-up' : differenceDimension < 0 ? 'arrow-down' : null
        const iconDifferencePressure =
            differencePressure > 0 ? 'arrow-up' : differencePressure < 0 ? 'arrow-down' : null
        const iconDifferenceSpeed =
            differenceSpeed > 0 ? 'arrow-up' : differenceSpeed < 0 ? 'arrow-down' : null

        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differenceDiameter"
                                title={<Text>Диаметр</Text>}
                                value={Math.abs(differenceDiameter)}
                                precision={2}
                                valueStyle={{ color: differenceDiameter ? '#cf1322' : '#3f8600' }}
                                prefix={<Icon type={iconDifferenceDiameter} />}
                                suffix="(мкр)"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differenceInconstancy"
                                title={<Text>Непостоянство</Text>}
                                value={Math.abs(differenceInconstancy)}
                                precision={2}
                                valueStyle={{
                                    color: differenceInconstancy > 0 ? '#cf1322' : '#3f8600'
                                }}
                                prefix={<Icon type={iconDifferenceInconstancy} />}
                                suffix="(мкр)"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differenceDimension"
                                title={<Text>Разноразмерность</Text>}
                                value={Math.abs(differenceDimension)}
                                precision={2}
                                valueStyle={{
                                    color: differenceDimension > 0 ? '#cf1322' : '#3f8600'
                                }}
                                prefix={<Icon type={iconDifferenceDimension} />}
                                suffix="(мкр)"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differencePressure"
                                title={<Text>Давление</Text>}
                                value={Math.abs(differencePressure)}
                                precision={2}
                                valueStyle={{ color: differencePressure ? '#cf1322' : '#3f8600' }}
                                prefix={<Icon type={iconDifferencePressure} />}
                                suffix="(Па)"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differenceSpeed"
                                title={<Text>Скорость</Text>}
                                value={Math.abs(differenceSpeed)}
                                precision={2}
                                valueStyle={{ color: differenceSpeed ? '#cf1322' : '#3f8600' }}
                                prefix={<Icon type={iconDifferenceSpeed} />}
                                suffix="(об/мин)"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}