import React, { PureComponent } from 'react'
import { Menu } from 'antd'
import { SolutionOutlined, TableOutlined, ToolOutlined, FileExcelOutlined  } from '@ant-design/icons'
import { file } from '../../../../../api/urls/'

const { SubMenu } = Menu

export default class MenuComponent extends PureComponent {
    state = {
        collapsed: false
    }

    handleClick = (e) => {
        this.props.handleClickMenu(e.key)
    }

    saveFile = (url, fileName) => {
        ;(async function () {
            const res = await fetch(url)
            const blob = await res.blob()
            let link = document.createElement('a')
            link.setAttribute('download', fileName)
            link.setAttribute('target', '_blank')
            link.href = URL.createObjectURL(blob)
            link.click()
            URL.revokeObjectURL(link.href)
        })()

        /*
        let link = document.createElement('a')
        link.download = 'hello.txt'
        let blob = new Blob(['Hello world!'], {type: 'text/plain'})
        link.href = URL.createObjectURL(blob)
        link.click()
        URL.revokeObjectURL(link.href)
*/
    }

    render() {
        return (
            <div>
                <Menu
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                    onClick={this.handleClick}
                >
                    <SubMenu
                        key="plan"
                        title={
                            <span>
                                <SolutionOutlined />
                            </span>
                        }
                    >
                        <Menu.Item key="plan50">50</Menu.Item>
                        <Menu.Item key="plan56">56</Menu.Item>
                        <Menu.Item key="plan57">57</Menu.Item>
                        <Menu.Item key="plan61">61</Menu.Item>
                        <Menu.Item key="plan63">63</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="scheme"
                        title={
                            <span>
                                <TableOutlined />
                            </span>
                        }
                    >
                        <Menu.Item key="scheme1">ШСЦ1</Menu.Item>
                        <Menu.Item key="scheme2">ШСЦ2</Menu.Item>
                        <Menu.Item key="scheme3">ШСЦ3</Menu.Item>
                        <Menu.Item key="scheme4">ШСЦ4</Menu.Item>
                        <Menu.Item key="scheme5">ШСЦ5</Menu.Item>
                        <Menu.Item key="scheme6">ШСЦ6</Menu.Item>
                        <Menu.Item key="scheme7">ШСЦ7</Menu.Item>
                        <Menu.Item key="scheme10">ШСЦ10</Menu.Item>
                        <Menu.Item key="scheme50">50</Menu.Item>
                        <Menu.Item key="scheme93">АТЦ</Menu.Item>
                        <Menu.Item key="scheme561">56(1)</Menu.Item>
                        <Menu.Item key="scheme562">56(2)</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="check"
                        title={
                            <span>
                                <ToolOutlined />
                            </span>
                        }
                    >
                        <Menu.Item key="check1">ШСЦ1</Menu.Item>
                        <Menu.Item key="check2">ШСЦ2</Menu.Item>
                        <Menu.Item key="check3">ШСЦ3</Menu.Item>
                        <Menu.Item key="check4">ШСЦ4</Menu.Item>
                        <Menu.Item key="check5">ШСЦ5</Menu.Item>
                        <Menu.Item key="check6">ШСЦ6</Menu.Item>
                        <Menu.Item key="check7">ШСЦ7</Menu.Item>
                        <Menu.Item key="check10">ШСЦ10</Menu.Item>
                        <Menu.Item key="check50">50</Menu.Item>
                        <Menu.Item key="check93">АТЦ</Menu.Item>
                        <Menu.Item key="check561">56(1)</Menu.Item>
                        <Menu.Item key="check562">56(2)</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="upload"
                        title={
                            <span>
                                <FileExcelOutlined  />
                            </span>
                        }
                    >
                        <Menu.Item
                            key="upload-system"
                            onClick={() =>
                                this.saveFile(
                                    file,
                                    'система_анализа_и_планирования_ремонтов_оборудования.xlsx'
                                )
                            }
                        >
                            Система анализа и планирования ремонтов
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
