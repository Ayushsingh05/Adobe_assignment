import React from 'react'

export const SingleUser = (props) => {
    console.log(props);
    const {name, postCount} = props;
    return (
        <div>
            <div className="user-name">
                {name}
            </div>
            <div className="user-post-count">
              Post Count :-  {postCount}
            </div>
            <div className="user-edit">
                View
            </div>
        </div>
    )
}
