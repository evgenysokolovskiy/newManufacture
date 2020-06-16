import React from 'react'
import ReactToPrint from 'react-to-print'
import ComponentToPrint from '../Content/TableComponents/TablePercentComponent'

class PrintComponent extends React.Component {
    render() {
        return (
            <div>
                <ReactToPrint
                    trigger={() => <a href="#">Print this out!</a>}
                    content={() => this.componentRef}
                />
                <ComponentToPrint ref={el => (this.componentRef = el)} />
            </div>
        )
    }
}

export default PrintComponent