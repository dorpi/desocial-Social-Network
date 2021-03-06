import React, { Component } from 'react'
import PropsTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty  from '../../validation/is-empty'
import {toAbsoluteUrl} from '../common/AssetsHelper'
import {proxy} from '../../config'
class ProfileItem extends Component {
  
    
    render() {

        const {profile} = this.props
      
    
        return (
            <div className="card card-body bg-light mv-3">
                <div className = "row">
                    <div className="col-2">
                        <img  src={`${proxy}${toAbsoluteUrl(profile.user.avatar)}?random=${Math.random()}`} alt="" className="rounded-circle"/>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{profile.user.name}</h3>
                        <p>{profile.status} {isEmpty(profile.company)?null:(<span>at {profile.company}</span>)}</p>
                        <p>{isEmpty(profile.location)?null:(<span>{profile.location}</span>)}</p>
                        <Link to={`/profile/user/${profile.user._id}`} className="btn btn-info">View Profile</Link>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                          <h4>Skills Set</h4>
                          <ul className="list-group">
                            {profile.skills.slice(0,4).map((skill,index)=>(
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1">
                                        {skill}
                                    </i>
                                </li>
)
                            )}
                          </ul>
                    </div>
                </div>
            </div>
        )
    }
}


ProfileItem.PropsTypes = {
    profile:PropsTypes.object.isRequired
}


export default ProfileItem;