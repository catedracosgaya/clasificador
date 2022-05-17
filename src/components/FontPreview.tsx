import React from 'react';

import './FontPreview.css';

interface FontPreviewProps {
  fontFace: string;
  fontName: string;
  loadFont: () => void;
  loadImage: () => void;
}

const FontPreview = ({
  fontFace,
  fontName,
  loadFont,
  loadImage
}: FontPreviewProps) => {
  const previewStyle = {
    fontFamily: fontFace || 'inherit'
  };

  return (
    <div className='pre-container'>
      <div className='pre-label'>
        {fontName || ''}
      </div>

      {fontFace &&
        <div className='pre-font' style={previewStyle}>
          ASOMgae
        </div>}
      {!fontFace &&
        <div className='pre-placeholder'>
          <span>
            Cargá una <a onClick={loadFont}>fuente</a> {/* o <a onClick={loadImage}>imagen</a> */} para ver una referencia
          </span>
        </div>}
    </div>
  );
};

export default FontPreview;