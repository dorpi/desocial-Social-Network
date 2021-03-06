import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { registerUser,setAuthLoading,setCurrentUser } from '../../redux/actions/authActions'
import PropsTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import Spinner from '../common/Spinner'


class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
      
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        else {
            this.props.setCurrentUser({})
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors)
            this.setState({ errors: this.props.errors })
    }
    onSubmit(event) {
        event.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);
    }

    onChange(e) {
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { errors } = this.state; //const errors = this.state.errors


        if (this.props.auth.loading || this.props.auth.isAuthenticated)
            return <Spinner />
        else
            return (
                <div className="register">

                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your DevConnector account</p>
                                <form onSubmit={this.onSubmit} noValidate>
                                    <TextFieldGroup
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextFieldGroup
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                        
                                    />
                                    <TextFieldGroup
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                    <TextFieldGroup
                                        type="password"
                                        placeholder="Confirm password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        error={errors.password2}
                                    />

                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

Register.PropsTypes = {
    registerUser: PropsTypes.func.isRequired,
    auth: PropsTypes.object.isRequired,
    errors: PropsTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { registerUser ,setAuthLoading,setCurrentUser})(withRouter(Register));