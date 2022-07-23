import React, { useEffect, useRef } from 'react';
import { Area } from 'react-easy-crop';

import './FontPreview.css';

interface FontPreviewProps {
  fontFace: string;
  fontName: string;
  refImage: { image: CanvasImageSource | null, crop: Area | null };
  loadFont: () => void;
  loadImage: () => void;
}

const FontPreview = ({
  fontFace,
  fontName,
  refImage,
  loadFont,
  loadImage
}: FontPreviewProps) => {
  const previewStyle = {
    fontFamily: fontFace || 'inherit'
  };

  const hasImage: boolean = refImage.image !== null && refImage.crop !== null;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!refImage.image || !refImage.crop) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      console.warn('Image preview: canvas unavailable');
      return;
    }

    const canvasBox = canvas.getBoundingClientRect();
    const aspect = canvasBox.width / canvasBox.height;
    const { x, y, width } = refImage.crop;

    canvas.width = width;
    canvas.height = width / aspect;
    ctx.drawImage(refImage.image, -x, -y);
  }, [refImage]);

  const canvasStyle = {
    display: hasImage ? 'initial' : 'none'
  };

  return (
    <div className='pre-container'>
      <div className='pre-label'>
        {fontName || ''}
      </div>

      <canvas className='pre-image' ref={canvasRef} style={canvasStyle} />

      {fontFace &&
        <div className='pre-font' style={previewStyle}>
          ASOMgae
        </div>}

      {!fontFace && !hasImage &&
        <div className='pre-placeholder'>
          <span>
            Cargá una <a onClick={loadFont}>fuente</a> o <a onClick={loadImage}>imagen</a> para ver una referencia
          </span>
        </div>}
    </div>
  );
};

export default FontPreview;