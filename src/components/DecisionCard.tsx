import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { DecisionNode, FinalNode, isAnimation, isDecision } from '../utils/DecisionTree';
import FrameSeekerAnim from './FrameSeekerAnim';

import './DecisionCard.css';

export interface DecisionCardProps {
  node: DecisionNode | FinalNode;
  fontName: string;
  set: (id: string) => void;
  back: () => void;
  reset: (resetFont: boolean) => void;
}

const DecisionCard = (props: DecisionCardProps) => {
  const [target, setTarget] = useState(0);

  const select = (e: Event, next: string) => {
    (e.target as HTMLElement).classList.add('clicked');
    setTimeout(() => props.set(next), 100);
  };

  const decisionButtons = (props.node as DecisionNode).options
    ?.map((option, i, arr) => {
      // Set a default target frame unless a target frame for the option is specified
      let targetFrame: number;

      // Assume a 10 frame (1/6s) animation, for a different animation length targets
      // should be specified for each option.
      // TODO: find a way to get the actual length of the animation, use that instead
      if (option.targetFrame === undefined)
        targetFrame = 10 / (arr.length - 1) * i;
      else targetFrame = option.targetFrame;

      return (
        <button
          key={i}
          onMouseOver={() => setTarget(targetFrame)}
          onClick={(e) => select(e.nativeEvent, option.leadsTo)} >
          {option.displayText}
        </button>
      );
    });

  console.log(props.node);
  return (
    <TransitionGroup className='dcard-transition-group'>
      {[props.node].map(node => // hack to trigger the transition
        isDecision(node) ? (
          <CSSTransition key={node.id} classNames='card' timeout={500}>
            <div className='dcard-root'>
              {props.node.id !== '01_serif_sans' &&
                <div className="dcard-top">
                  <button onClick={() => props.back()}>Atrás</button>
                  <button onClick={() => props.reset(true)}>Inicio</button>
                </div>}

              <div className='dcard-content'>
                {isAnimation(node) &&
                  <FrameSeekerAnim
                    targetFrame={target}
                    size='100%'
                    animationData={node.animationData} />}

                {!isAnimation(node) &&
                  <img src={node.imageSrc} />}

                {node.prompt &&
                  <p className='dcard-prompt'>
                    {node.prompt.split('\n').map((prompt, i) => (
                      <div key={i}>{prompt}</div>
                    ))}
                  </p>}
              </div>

              <div className='dcard-buttons'>
                {decisionButtons}
              </div>
            </div>
          </CSSTransition>
        ) : (
          <CSSTransition key={node.id} classNames='card' timeout={500}>
            <div className='dcard-root dcard-end'>
              {node.class &&
                <div>
                  Clasificaste {props.fontName} como:
                </div>}
              {node.class &&
                <div className="dcard-end-class">
                  {node.class.split('/').map(part =>
                    part.charAt(0) === '#' ? (
                      <em>{part.substring(1)}</em>
                    ) : (
                      <span>{part}</span>
                    )
                  )}
                </div>}

              {!node.class &&
                <div>
                  No pudimos clasificar {props.fontName}. Es posible que no entre en ninguna de las categorías.
                </div>}

              <p>
                Si pensás que te equivocaste en tu clasificación, podés{' '}
                <a onClick={() => props.reset(false)}>volver a empezar</a>
                , o podés <a onClick={() => props.reset(true)}>clasificar otra familia</a>.
              </p>
            </div>
          </CSSTransition>
        )
      )}
    </TransitionGroup>
  );
};

export default DecisionCard;