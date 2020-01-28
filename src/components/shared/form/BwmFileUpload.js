import React from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import { toast } from 'react-toastify';

import * as actions from 'actions';


export class BwmFileUpload extends React.Component {

  constructor() {
    super();

    this.setupReader()

    this.state = {
      selectedFile: undefined,
      imageBase64: '',
      initialImageBase64: '',
      croppedImage: {},
      pending: false,
      status:'INIT',
      crop: {}
    }

    this.onChange = this.onChange.bind(this);
  }

  setupReader() {
    this.reader = new FileReader();

    this.reader.addEventListener('load', (event) => {
      const { initialImageBase64 } = this.state;

      const imageBase64 = event.target.result;

      if(initialImageBase64) {
        this.setState({imageBase64});
      }else {
        this.setState({imageBase64, initialImageBase64: imageBase64});
      }
    });
  }

  resetToDefaultState(status) {
    this.state = ({
      selectedFile: undefined,
      imageBase64: '',
      initialImageBase64: '',
      croppedImage: {},
      pending: false,
      status
    });
  }

  onChange(event) {
    const selectedFile = event.target.files[0];

    if(selectedFile) {
      this.setState({
        selectedFile,
        initialImageBase64: ''
      });

      //calls setupReader because of the addEventListener('load') and converts image to base64
      this.reader.readAsDataURL(selectedFile);
    }
  }

  onCropChange(crop) {
    this.setState({ crop });
  }

  onImageLoaded(image) {
    
    if(image.naturalWidth < 950 && image.naturalHeight < 720) {
      console.log(image.naturalWidth, image.naturalHeight)
      this.resetToDefaultState('INIT');
      toast.error('The image must have a width of 950px and height of 700px.');
      return;

    }
    
    this.setState({ 
      crop: makeAspectCrop({ 
        aspect: 4 / 3 ,
        x: 10,
        y: 10,
        width: 50,
//        height: image.height 
      }, image.width / image.height)
    });
  }
  
  async onCropCompleted(crop, pixelCrop) { // need to use async when using await ie:croppedImage
//    console.log('onCropChange', this.state);
    const { selectedFile, initialImageBase64 } = this.state;

    if(selectedFile && (pixelCrop.height > 0 && pixelCrop.width > 0)) {
      const img = new Image();
      img.src = initialImageBase64;

      const croppedImage = await getCroppedImg(img, pixelCrop, selectedFile.name);
      this.setState({croppedImage});

      this.reader.readAsDataURL(croppedImage);
    }
  }

  onError(error) {
    this.setState({pending: false, status: 'FAIL'});
  }

  onSuccess(uploadedImage) {

    const {onChange} = this.props.input || this.props;

    this.resetToDefaultState('OK');

    onChange(uploadedImage);

  }

  uploadImage() {
    const { croppedImage } = this.state;

    if(croppedImage) {
      this.setState({pending: true, status: 'INIT'});
      actions.uploadImage(croppedImage).then(
        (uploadedImage) => { this.onSuccess(uploadedImage) },
        (error) => { this.onError(error) }
      )
    }
  }

  renderSpinningCircle() {
    const { pending } = this.state;

    if(pending) {
      return (
        <div className='img-loading-overlay'>
          <div className='img-spinning-circle'>

          </div>
        </div>
      )
    }
  }

  renderImageStatus() {
    const { status } = this.state;

    if(status === 'OK') {
      return <div className='alert alert-success'> Image Upload Successfuly! </div>
    }

    if(status === 'FAIL') {
      return <div className='alert alert-danger'> Image Upload Failed! </div>
    }
  }

  render() {

    const { selectedFile, imageBase64, crop, initialImageBase64 } = this.state;

    return (
      <div className='img-upload-container'>
        <label className='img-upload btn btn-bwm'>
          <span className='upload-text'> Select an image</span>
          <input type='file'
                 accept='.jpg, .png, .jpeg'
                 onChange={this.onChange} />
        </label>

        { selectedFile &&
          <button className='btn btn-success btn-upload'
                  type='button'
                  disabled={!selectedFile}
                  onClick={() => this.uploadImage()}>
              Upload Image
          </button>
        }

        { initialImageBase64 &&  //like an if statement
          <ReactCrop src={initialImageBase64}
                     crop={crop}
                     onChange={(crop) => this.onCropChange(crop)}
                     onComplete={(crop, pixelCrop) =>this.onCropCompleted(crop, pixelCrop)}
                     onImageLoaded={(image) => this.onImageLoaded(image)} />
        }

          { imageBase64 &&
            <div className='img-preview-container'>
              <div className='img-preview'
                   style={{'backgroundImage': 'url(' + imageBase64 + ')'}}>
              </div>

              {this.renderSpinningCircle()}
            </div>
          }

          {this.renderImageStatus()}
      </div>
    )
  }
}


function getCroppedImg(image, pixelCrop, fileName) {
  const canvas = document.createElement('canvas');
//  const scaleX = image.naturalWidth / image.width;
//  const scaleY = image.naturalHeight / image.height;
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      file.name = fileName;
      resolve(file);
    }, 'image/jpeg', 1);
  });
}

