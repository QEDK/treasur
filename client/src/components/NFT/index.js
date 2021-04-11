import React from 'react'

const index = ({url}) => {
  if(!url){
    url = "https://www.youtube.com/embed/tfSS1e3kYeo"
  }
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