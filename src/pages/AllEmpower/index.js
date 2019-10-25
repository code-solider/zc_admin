import React, { Component } from 'react';
import List from './List';
import { connect } from 'dva';
import AddUserModal from './AddUserModal'
import AddNumModal from './AddNumModal';
import EditUserModal from './EditUserModal';

@connect(({ allagent }) => ({
    allagent
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
            type: 'allagent/fetch'
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
        let { allagent } = this.props;
        return (
            <div>
                <List
                    onShow={this.openModal}
                    data={allagent.agentList}
                />
                <AddUserModal
                    visible={addUserModalIsShow}
                    onClose={this.closeModal}
                    destroyOnClose={true}
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
