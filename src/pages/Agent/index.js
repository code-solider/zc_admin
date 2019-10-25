import React, { Component } from 'react';
import TopFrom from './TopForm'
import List from './List'
import AddUserModal from './AddUserModal'
import AddNumModal from './AddNumModal'
import EditUserModal from './EditUserModal'
import { connect } from 'dva';

@connect(({ agent }) => ({
    agent
}))
class AllEmpowerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addUserModalIsShow: false,
            addNumModalIsShow: false
        }
    }


    componentWillMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'agent/fetch'
        })
        dispatch({
            type: 'agent/getUserInfo'
        })
    }


    closeModal = (e) => {
        //e,1 addUserModalIsShow, 2,addNumModalIsShow
        e === 1 ? this.setState({ addUserModalIsShow: false }) : e === 2 ? this.setState({ addNumModalIsShow: false }) : null
    }

    openModal = (e) => {
        //e,1 addUserModalIsShow, 2,addNumModalIsShow
        e === 1 ? this.setState({ addUserModalIsShow: true }) : e === 2 ? this.setState({ addNumModalIsShow: true }) : null
    }
    render() {
        let { addUserModalIsShow, addNumModalIsShow } = this.state;
        let { agent: { agentList } } = this.props;
        return (
            <div>
                <TopFrom />
                <List
                    onShow={this.openModal}
                    data={agentList}
                />
                <AddUserModal
                    visible={addUserModalIsShow}
                    onClose={this.closeModal}
                />
                <AddNumModal
                    visible={addNumModalIsShow}
                    onClose={this.closeModal}
                />
                <EditUserModal />
            </div>
        )
    }
}

export default AllEmpowerPage;
