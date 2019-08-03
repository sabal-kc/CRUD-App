import React, { Component } from 'react'
import AddStudent from './addStudent';
import { withRouter } from 'next/router'

class Update extends Component {
    render() {
        const { router } = this.props
        return (
         <AddStudent flag="edit" id={router.query.id}/>
        )
    }
}

export default withRouter(Update)
