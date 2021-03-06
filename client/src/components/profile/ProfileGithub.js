import React, { Component } from 'react';
import PropsTypes from 'prop-types';


 class ProfileGithub extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            clientId:'',
            clientSecret:'',
            count:5,
            sort:'created: asc',
            repos:[]
        }
    }

componentDidMount(){
    const {username} = this.props;
    const {count ,sort,clientId,clientSecret} = this.state;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
    .then(res=>res.json())
    .then(data=>{
        if (this.refs.myRef)
            this.setState({repos:data})
        })
    .catch(err=>console.log(err));
}

    render() {
        const {repos} = this.state
        const reposItems = repos.map((repo,index)=>(
            <div className="card card-body mb-2" key={index}>
                <div className="row"> 
                    <div className="col-md-6">
                        <h4>
                            <a href={repo.html_url} className="text-info" target="_blank" rel='noopener noreferrer'>
                                {repo.name}
                            </a>
                            <p>{repo.description}</p>
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondery mr-1">
                            Watchers: {repo.watchers_count}
                        </span>
                        <span className="badge badge-success ">
                            Forks: {repo.forks_count}
                        </span>
                    </div>
                    
                </div>
            </div>
        ))

        return (
            <div ref="myRef">
                <hr/>
                <h3 className="mb-4">Latest Github Repos</h3>
                {reposItems}
            </div>
        )
    }
}


ProfileGithub.PropsTypes={
   username:PropsTypes.string.isRequired 
}

export default ProfileGithub;