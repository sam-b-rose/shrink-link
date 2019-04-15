import React from 'react'

const Frame = ({ url }) => {
  return (
    <div>
      <div className="absolute top-0 right-0 bottom-0 left-0">
        <iframe title="content" src={url} width="100%" height="100%" frameBorder="0"></iframe>
      </div>
    </div>
  )
}

export default Frame
