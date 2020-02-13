import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Typography } from 'antd'

const { SubMenu } = Menu
const { Title } = Typography

export default class MenuComponent extends React.Component {
    state = {
        collapsed: false
    }

    handleClick = e => {
        this.props.handleClickMenu(e.key)
    }

    render() {
        return (
            <div>
                <Menu
                    defaultOpenKeys={['plan']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                    onClick={this.handleClick}
                >
                    <SubMenu
                        key="plan"
                        title={
                            <span>
                                <Icon type="solution" />
                            </span>
                        }
                    >
                        <Menu.Item key="plan50">
                            <span>
                                <Link to="/repair/plan/50">50</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="plan56">
                            <span>
                                <Link to="/repair/plan/56">56</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="plan57">
                            <span>
                                <Link to="/repair/plan/57">57</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="plan61">
                            <span>
                                <Link to="/repair/plan/61">61</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="plan63">
                            <span>
                                <Link to="/repair/plan/63">63</Link>
                            </span>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="check"
                        title={
                            <span>
                                <Icon type="tool" />
                            </span>
                        }
                    >
                        <Menu.Item key="check50">
                            <span>
                                <Link to="/repair/check/50">50</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="check56">
                            <span>
                                <Link to="/repair/check/56">56</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="check57">
                            <span>
                                <Link to="/repair/check/57">57</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="check61">
                            <span>
                                <Link to="/repair/check/61">61</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="check63">
                            <span>
                                <Link to="/repair/check/63">63</Link>
                            </span>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="scheme"
                        title={
                            <span>
                                <Icon type="table" />
                            </span>
                        }
                    >
                        <Menu.Item key="scheme1">
                            <span>
                                <Link to="/repair/scheme/1">ШСЦ-1</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme2">
                            <span>
                                <Link to="/repair/scheme/2">ШСЦ-2</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme3">
                            <span>
                                <Link to="/repair/scheme/3">ШСЦ-3</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme4">
                            <span>
                                <Link to="/repair/scheme/4">ШСЦ-4</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme5">
                            <span>
                                <Link to="/repair/scheme/5">ШСЦ-5</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme6">
                            <span>
                                <Link to="/repair/scheme/6">ШСЦ-6</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme7">
                            <span>
                                <Link to="/repair/scheme/7">ШСЦ-7</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme10">
                            <span>
                                <Link to="/repair/scheme/10">ШСЦ-10</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme50">
                            <span>
                                <Link to="/repair/scheme/50">50</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme93">
                            <span>
                                <Link to="/repair/scheme/93">АТЦ</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme561">
                            <span>
                                <Link to="/repair/scheme/561">56(1)</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="scheme562">
                            <span>
                                <Link to="/repair/scheme/562">56(2)</Link>
                            </span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
