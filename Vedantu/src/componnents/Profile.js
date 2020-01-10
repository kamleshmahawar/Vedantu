import React from 'react';

function Profile(props) {
    const { data } = props;
    return (
        <div className="profile">
            <div className="avtar">
                <img src={data.avatar_url} alt="avatar..." />
            </div>
            <div>
                <h1 className="vcard-names">
                    <span className="p-name" >{data.name}</span>
                    <span className="p-nickname">{data.login}</span>
                </h1>
            </div>
        </div>
    )
}
export default Profile;



