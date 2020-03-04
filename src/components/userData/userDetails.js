import React from 'react';
import UserService from '../../service/userService';
import './userDetails.css';
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
export class User {
    constructor() {
        this.id = '';
        this.employee_name = '';
        this.employee_salary = '';
        this.employee_age = '';
    }
}
class UserDetails extends React.Component {

    constructor(props) {
        super(props)
        this.currentIndex = 0;
        this.currentState = '';
        this.state = {
            userDetails: [],
            loading: true,
            showModal: false,
            currentUserDetail: {}
        }
        if (!this.props.location.state) {
            this.props.history.push('/login');
        }
        UserService.fetchUserDetails().then((res) => {
            res.length = 10;
            this.props.fetchUsers({
                loading: false,
                userDetails: res
            });
        });
        this.logOut = this.logOut.bind(this);
    }

    editUserData(i) {
        this.currentIndex = i;
        this.currentState = 'Edit'
        this.props.editUser({
            currentUserDetail: _.cloneDeep(this.props.users.userDetails.data[i])
        });
        this.props.showHideModal(true);
    }

    deleteUserData(i) {
        let tempUserDetails = this.props.users.userDetails.data
        tempUserDetails.splice(i, 1);
        this.props.onSave({
            userDetails: tempUserDetails
        });
    }

    onSaveClick() {
       if (this.currentState === 'Add') {
            this.props.users.userDetails.data.push(this.props.users.currentUserDetail);
        } else {
            this.props.users.userDetails.data[this.currentIndex] = this.props.users.currentUserDetail;
        }

        this.props.onSave({
            userDetails: this.props.users.userDetails
        });
        this.props.showHideModal(false)
    }

    logOut() {
        this.props.history.push('/login');
    }

    addUser() {
        this.currentState = 'Add';

        this.props.editUser({
            currentUserDetail: new User()
        });
        this.props.showHideModal(true);
    }

    onEditChange(event, type) {
        const editUserDetail = _.cloneDeep(this.props.users.currentUserDetail);;
        switch (type) {
            case 'id':
                editUserDetail.id = event.target.value;
                this.props.editUser({
                    currentUserDetail: editUserDetail
                });
                break;
            case 'name':
                editUserDetail.employee_name = event.target.value;
                this.props.editUser({
                    currentUserDetail: editUserDetail
                });
                break;
            case 'salary':
                editUserDetail.employee_salary = event.target.value;
                this.props.editUser({
                    currentUserDetail: editUserDetail
                });
                break;
            case 'age':
                editUserDetail.employee_age = event.target.value;
                this.props.editUser({
                    currentUserDetail: editUserDetail
                });
                break;
        }
    }


    render() {
        const editUserDetail = this.props.users.currentUserDetail;
        const userName = this.props.location.state ? this.props.location.state.username : '';

        const userDetails = this.props.users.userDetails.data;
        console.log(this.props.users);
        return (

            <div className='container'>
                <div className='details-header'>
                    <h3>Welcome {userName}</h3>
                    <a className='logout-btn' href='javascript:void(0);' onClick={this.logOut}>Logout</a>
                </div>
                <Button variant="primary" onClick={() => this.addUser()}>Add User</Button>
                {this.props.users.loading ? <div>Loading data...</div> :
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Salary</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!userDetails.length ? <tr><td colspan='5'>No Data Found</td></tr> :
                                userDetails.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className='user-details-td'>{data.id}</td>
                                            <td className='user-details-td'>{data.employee_name}</td>
                                            <td className='user-details-td'>{data.employee_salary}</td>
                                            <td className='user-details-td'>{data.employee_age}</td>
                                            <td><a href='javascript:void();' onClick={() => this.editUserData(i)}>Edit</a>
                                                <a href='javascript:void();' onClick={() => this.deleteUserData(i)}>Delete</a>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                }
                <Modal
                    show={this.props.users.showModal}
                    onHide={() => this.props.showHideModal(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Employee Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label for="email">Employee Id:</label>
                            <input type="text" disabled={this.currentState === 'Edit'} onChange={(event) => this.onEditChange(event, 'id')} value={editUserDetail.id} className="form-control" id="email" />
                        </div>
                        <div className="form-group">
                            <label for="email">Employee Name:</label>
                            <input type="text" onChange={(event) => this.onEditChange(event, 'name')} value={editUserDetail.employee_name} className="form-control" id="email" />
                        </div>
                        <div className="form-group">
                            <label for="email">Employee Salary:</label>
                            <input type="text" onChange={(event) => this.onEditChange(event, 'salary')} value={editUserDetail.employee_salary} className="form-control" id="email" />
                        </div>
                        <div className="form-group">
                            <label for="email">Employee Age:</label>
                            <input type="text" onChange={(event) => this.onEditChange(event, 'age')} value={editUserDetail.employee_age} className="form-control" id="email" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.showHideModal(false)}>Close</Button>
                        <Button variant="primary" onClick={() => this.onSaveClick(false)}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userDetailReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (userDetails) => {
            dispatch({
                type: 'fetch',
                payload: userDetails
            });

        },
        editUser: (userDetails) => {
            dispatch({
                type: 'edit',
                payload: userDetails
            })
        },
        onSave: (userDetails) => {
            dispatch({
                type: 'save',
                payload: userDetails
            })
        },
        showHideModal: (flag) => {
            dispatch({
                type: 'showHideModal',
                payload: {
                    showModal: flag
                }
            })
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)

