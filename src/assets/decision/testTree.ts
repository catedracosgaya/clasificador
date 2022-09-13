// Import animations
import anim_01_serif_sans from '../lottie/serif_sans.json';
import anim_02_stroke from '../lottie/stroke.json';
import anim_07_serif_axis from '../lottie/serif_axis.json';
import anim_08a_serif_contrast from '../lottie/serif_contrast.json';
import anim_08b_serif_contrast_simple from '../lottie/serif_contrast_simple.json';
import anim_13_serif_e_axis from '../lottie/serif_e_axis.json';

// Import static illustrations
import svg_03_sans_geom from '../svg/sans_geom.svg';
import svg_04_sans_human from '../svg/sans_huma.svg';
import svg_05_sans_grot from '../svg/sans_grot.svg';
import svg_09_serif_mod from '../svg/serif_mod.svg';
import svg_10_serif_trn from '../svg/serif_trn.svg';
import svg_11_serif_old from '../svg/serif_old.svg';
import svg_12_serif_human from '../svg/serif_hum.svg';
import svg_14_serif_slab from '../svg/serif_slab.svg';
import svg_15_hybrid from '../svg/hybrid.svg';


import { DecisionTree } from '../../utils/DecisionTree';

const testTree: DecisionTree = [
  {
    id: '01_serif_sans',
    animationData: anim_01_serif_sans,
    options: [
      {
        displayText: 'Serif',
        leadsTo: '06_stroke_serif'
      },
      {
        displayText: 'Palo seco',
        leadsTo: '02_stroke_sans'
      }
    ]
  },
  {
    id: '02_stroke_sans',
    animationData: anim_02_stroke,
    options: [
      {
        displayText: 'Trazo gradual',
        leadsTo: '04_sans_human'
      },
      {
        displayText: 'Trazo uniforme',
        leadsTo: '03_sans_geom'
      }
    ]
  },
  {
    id: '03_sans_geom',
    imageSrc: svg_03_sans_geom,
    prompt: '¿Las estructuras están basadas en formas geométricas simples?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E01_sans_geom'
      },
      {
        displayText: 'No',
        leadsTo: '04_sans_human'
      }
    ]
  },
  {
    id: '04_sans_human',
    imageSrc: svg_04_sans_human,
    prompt: '¿Las estructuras se asemejan a las clásicas romanas?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E02_sans_human'
      },
      {
        displayText: 'No',
        leadsTo: '05_sans_grot'
      }
    ]
  },
  {
    id: '05_sans_grot',
    imageSrc: svg_05_sans_grot,
    prompt: '¿Hay una ligera cuadratura en las curvas?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E03_sans_grot'
      },
      {
        displayText: 'No',
        leadsTo: '15a_hybrid_sans_route_1'
      }
    ]
  },
  {
    id: '06_stroke_serif',
    animationData: anim_02_stroke,
    options: [
      {
        displayText: 'Trazo gradual',
        leadsTo: '07_serif_axis'
      },
      {
        displayText: 'Trazo uniforme',
        leadsTo: '14_serif_slab'
      }
    ]
  },
  {
    id: '07_serif_axis',
    animationData: anim_07_serif_axis,
    prompt: '¿Cómo es el eje de modulación?',
    options: [
      {
        displayText: 'Vertical',
        leadsTo: '08b_serif_contrast_simple'
      },
      {
        displayText: 'Inclinado',
        leadsTo: '08a_serif_contrast'
      }
    ]
  },
  {
    id: '08a_serif_contrast',
    animationData: anim_08a_serif_contrast,
    prompt: '¿Cómo es el contraste entre finos y gruesos?\nLigero: el fino entra menos de dos veces en el grueso\nPronunciado: el fino entra más de 4 veces en el grueso',
    options: [
      {
        displayText: 'Pronunciado',
        leadsTo: '10_serif_trn',
        targetFrame: 0
      },
      {
        displayText: 'Medio',
        leadsTo: '11_serif_old',
        targetFrame: 10
      },
      {
        displayText: 'Ligero',
        leadsTo: '12_serif_human',
        targetFrame: 20
      }
    ]
  },
  {
    id: '08b_serif_contrast_simple',
    animationData: anim_08b_serif_contrast_simple,
    prompt: '¿Cómo es el contraste entre finos y gruesos?',
    options: [
      {
        displayText: 'Pronunciado',
        leadsTo: '09_serif_mod'
      },
      {
        displayText: 'Medio o bajo',
        leadsTo: '14_serif_slab'
      }
    ]
  },
  {
    id: '09_serif_mod',
    imageSrc: svg_09_serif_mod,
    prompt: '¿Tiene remates filiformes?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E05_serif_mod'
      },
      {
        displayText: 'No',
        leadsTo: '10_serif_trn'
      }
    ]
  },
  {
    id: '10_serif_trn',
    imageSrc: svg_10_serif_trn,
    prompt: '¿Los remates son triangulares y cóncavos?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E06_serif_trn'
      },
      {
        displayText: 'No',
        leadsTo: '11_serif_old'
      }
    ]
  },
  {
    id: '11_serif_old',
    imageSrc: svg_11_serif_old,
    prompt: '¿Los remates son finos y largos?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E07_serif_old'
      },
      {
        displayText: 'No',
        leadsTo: '12_serif_human'
      }
    ]
  },
  {
    id: '12_serif_human',
    imageSrc: svg_12_serif_human,
    prompt: '¿Los remates son triangulares, gruesos y cortos?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: '13_serif_e_axis'
      },
      {
        displayText: 'No',
        leadsTo: '15c_hybrid_serif_route_1'
      }
    ]
  },
  {
    id: '13_serif_e_axis',
    animationData: anim_13_serif_e_axis,
    prompt: '¿La barra de la letra «e» es inclinada?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E08_serif_human',
        targetFrame: 10
      },
      {
        displayText: 'No',
        leadsTo: '15d_hybrid_serif_route_2',
        targetFrame: 0
      }
    ]
  },
  {
    id: '14_serif_slab',
    imageSrc: svg_14_serif_slab,
    prompt: '¿Los remates tienen un ancho similar al trazo?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E04_serif_slab'
      },
      {
        displayText: 'No',
        leadsTo: '15a_hybrid_sans_route_1'
      }
    ]
  },
  // This route is a bit complicated, as the slides are presented in alternate order
  // depending on whether we come from a sans serif route (a -> b), or a serif route
  // (c -> d). Duplicating the slides is easier than coding in a special case.
  {
    id: '15a_hybrid_sans_route_1',
    imageSrc: svg_15_hybrid,
    prompt: '¿Hay un leve aumento de grosor hacia el final del trazo?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E09_hybrid'
      },
      {
        displayText: 'No',
        leadsTo: '15b_hybrid_sans_route_2'
      }
    ]
  },
  {
    id: '15b_hybrid_sans_route_2',
    imageSrc: svg_15_hybrid,
    prompt: '¿Los remates son triangulares, finos y muy cortos?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E09_hybrid'
      },
      {
        displayText: 'No',
        leadsTo: 'E00_unclassified'
      }
    ]
  },
  {
    id: '15c_hybrid_serif_route_1',
    imageSrc: svg_15_hybrid,
    prompt: '¿Los remates son triangulares, finos y muy cortos?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E09_hybrid'
      },
      {
        displayText: 'No',
        leadsTo: '15d_hybrid_serif_route_2'
      }
    ]
  },
  {
    id: '15d_hybrid_serif_route_2',
    imageSrc: svg_15_hybrid,
    prompt: '¿Hay un leve aumento de grosor hacia el final del trazo?',
    options: [
      {
        displayText: 'Sí',
        leadsTo: 'E09_hybrid'
      },
      {
        displayText: 'No',
        leadsTo: 'E00_unclassified'
      }
    ]
  },

  // ENDING SLIDES
  {
    id: 'E00_unclassified',
    class: ''
  },
  {
    id: 'E01_sans_geom',
    class: 'Sans serif /#geométrica/'
  },
  {
    id: 'E02_sans_human',
    class: 'Sans serif /#humanística/'
  },
  {
    id: 'E03_sans_grot',
    class: 'Sans serif /#grotesca/'
  },
  {
    id: 'E04_serif_slab',
    class: '/#Egipcia/ (Slab serif)'
  },
  {
    id: 'E05_serif_mod',
    class: 'Romana /#moderna/'
  },
  {
    id: 'E06_serif_trn',
    class: 'Romana /#de transición/'
  },
  {
    id: 'E07_serif_old',
    class: 'Romana /#antigua/'
  },
  {
    id: 'E08_serif_human',
    class: 'Romana /#humanística/'
  },
  {
    id: 'E09_hybrid',
    class: '/#Incisa/ (híbrida)'
  }
];

export default testTree;
