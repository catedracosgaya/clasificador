import React, { useState } from 'react';
import opentype from 'opentype.js';

import DecisionSlides from './components/DecisionSlides';
import FontPreview from './components/FontPreview';

import './App.css';
import Anchor from './components/Anchor';

function App() {
  const [started, setStarted] = useState(false);
  const [customFont, setCustomFont] = useState('');
  const [customFontName, setCustomFontName] = useState('');
  let fontLoader: HTMLElement | null = null;

  const loadFont = async (ev: Event) => {
    const input = ev.target as HTMLInputElement;

    if (input.files) {
      const file = input.files[0];
      const dataUrl = URL.createObjectURL(file);

      const parsed = await opentype.load(dataUrl);
      const fontName = parsed.names.fullName.en;

      const font = new FontFace(fontName, `url(${dataUrl})`);

      const loaded = await font.load();
      console.log(loaded);
      document.fonts.add(loaded);

      setCustomFont(`'${loaded.family}', Chivo`);
      setCustomFontName(fontName);
      setStarted(true);
    }
  };

  return (
    <div className='App'>
      <h1 className='title'>El <em>clasificador</em></h1>

      <div className='summary'>
        <p>
          El Clasificador es un recurso para entender la clasificación 
          tipográfica que funciona a partir de preguntas binarias sobre 
          distintas características tipográficas. Las respuestas positivas 
          o negativas determinan un recorrido hacia la clasificación final.
        </p>
        <p>
          Esta versión interactiva está basada 
          en <Anchor href='http://www.oert.org/el-clasificador/'>este circuito</Anchor> desarrollado 
          en 2001. Para comenzar, tenés que elegir una tipografía e iniciar el recorrido 
          a partir de definir si es de palo seco (sans serif) o no. Esa decisión 
          te abre dos caminos diferentes. Las respuestas que des a cada pregunta 
          («sí» o «no») te guiarán en el recorrido del circuito. Al final del 
          mismo llegarás a una de las categorías o determinarás que no es posible 
          su clasificación en este sistema.
        </p>
      </div>

      <div className='font-preview'>
        <FontPreview fontFace={customFont} fontName={customFontName}
          loadFont={() => fontLoader?.click()}
          loadImage={() => fontLoader?.click()} />
      </div>

      {!started &&
        <div className='font-upload'>
          <input type='file' name='font_loader' id='font_loader'
            accept='.ttf, .otf, .woff, .woff2' hidden
            ref={el => fontLoader = el}
            onChange={ev => loadFont(ev.nativeEvent)} />

          <button onClick={() => fontLoader?.click()}>
            Cargar fuente (TTF)
          </button>

          <button onClick={() => fontLoader?.click()}>
            Cargar imagen
          </button>

          <button onClick={() => setStarted(true)}>
            Seguir sin referencia
          </button>
        </div>}

      {started &&
        <main className='decision-slides'>
          <DecisionSlides fontName={customFontName} resetFont={() => {
            setCustomFont('');
            setCustomFontName('');
            setStarted(false);
          }} />
        </main>}
    </div>
  );
}

export default App;
