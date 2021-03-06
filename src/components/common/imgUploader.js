import React from 'react'
import ReactFilestack from 'filestack-react'

const ImgUploader = ({ parentCallback }) => {
  return (
    <ReactFilestack
      apikey={process.env.FILESTACK_KEY}

      componentDisplayMode={{
        type: 'button',
        customText: 'upload an image',
        customClass: 'button is-success'

      }}
      onSuccess={
        res => parentCallback(res)
      }
    />
  )
}

export default ImgUploader

// THIS NEEDS TO BE ADDED TO ANY COMPONENT YOU ADD THIS TO!!!!!

// constructor() {
//   super()
//   this.state = {
//     imgUploadData: {}
//   }
//   this.handleUpload = this.handleUpload.bind(this)
// }
//
// handleUpload(imageData) {
//   console.log('image upload suceess...', imageData)
//   this.setState({ imgUploadData: imageData })
// }


// YOU ALSO NEED TO ADD THE CALLBACK FUNCTION AS A PROP WHEN YOU CALL THE UPLOADER

//   <ImgUploader parentCallback={this.handleUpload} />

//REMEMBER TO IMPORT THE COMPONENT!
