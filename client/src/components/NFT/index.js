import React from 'react'

const index = ({id}) => {

    const url = `https://www.youtube.com/embed/${id}`
    
    return (
        <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    )
}

export default index