import React from 'react'

const Avatar = ({name}) => {
    const firstLetter = name ? name[0].toUpperCase() : '';
    return (
        <span className='avatar'>
            {firstLetter}
        </span>
    )
}

export default Avatar
