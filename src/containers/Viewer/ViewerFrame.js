import React from 'react'

const ViewerFrame = ({ url }) => {
  return (
    <div>
      <div className="absolute top-0 right-0 bottom-0 left-0">
        <iframe title="content" src={url} width="100%" height="100%" frameBorder="0"></iframe>
      </div>

      <style jsx>{`
        html,
        body {
          position: relative;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default ViewerFrame
