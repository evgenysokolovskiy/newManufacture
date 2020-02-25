import React, { PureComponent } from 'react'
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    LabelList
} from 'recharts'

export default class DiameterComponent extends PureComponent {
    render() {
        const { date, dataDiameter, CustomizedAxisTick, handleClick, getData } = this.props
        return (
            <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                <ComposedChart data={dataDiameter} syncId="composedChart" onClick={handleClick}>
                    <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                    <YAxis type="number" domain={['dataMin', 'dataMax']} scale="linear" />
                    <Area dataKey="norm" name="Норматив (min/max)" stroke="#222" type="linear" />
                    <CartesianGrid stroke="#000" strokeWidth={0.5} />
                    <Tooltip content={getData} />

                    <ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />
                    <ReferenceLine x={date} stroke="red" />
                    <Scatter
                        dataKey="trueFact"
                        name="Факт (норма)"
                        stroke="lightgreen"
                        strokeWidth={1}
                        fill="lightgreen"
                    >
                        <LabelList dataKey="trueFact" position="top" />
                    </Scatter>
                    <Scatter
                        dataKey="falseFact"
                        name="Факт (не норма)"
                        stroke="lightcoral"
                        strokeWidth={1}
                        fill="lightcoral"
                    >
                        <LabelList dataKey="falseFact" position="top" />
                    </Scatter>
                </ComposedChart>
            </ResponsiveContainer>
        )
    }
}
