import React, { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import './ImageCropper.css';

interface ImageCropperProps {
  src: string;
  onComplete: (croppedArea: Area) => void;
  onCancel: () => void;
}

const ImageCropper = ({
  src,
  onComplete,
  onCancel
}: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedArea, setCroppedArea] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  const onCropComplete = useCallback((_, croppedArea: Area) => {
    console.log(croppedArea);
    setCroppedArea(croppedArea);
  }, []);

  return (
    <div className='crop-root'>
      <div className='crop-buttons'>
        <button
          onClick={() => onComplete(croppedArea)}>
          ✔
        </button>

        <button className='crop-cancel'
          onClick={onCancel}>
          ✖
        </button>
      </div>

      <div className='crop-content'>
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={4}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
        />
      </div>
    </div>
  );
};

export default ImageCropper;