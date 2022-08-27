import React, { useEffect, useState } from 'react';
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

export interface DecisionCardHeaderProps {
  node: DecisionNode | FinalNode;
  next: string | null;
  set: (id: string) => void;
  back: () => void;
  reset: (resetFont: boolean) => void;
}

const DecisionCardHeader = ({
  node,
  next,
  set,
  back,
  reset,
}: DecisionCardHeaderProps) => (
  <div className='dcard-top'>
    <button className='small' onClick={() => reset(true)}>
      Inicio
    </button>
    {node.id !== '01_serif_sans' &&
      <button className='small' onClick={() => back()}>
        Atrás
      </button>
    }
    <div className='dcard-top-space' />
    {next !== null &&
      <button
        className='small dcard-btn-next'
        onClick={() => set(next)}
      >
        Siguiente
      </button>
    }
  </div>
);

const DecisionCard = ({
  node,
  fontName,
  set,
  back,
  reset,
}: DecisionCardProps) => {
  const [target, setTarget] = useState(0);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    setNext(null);
  }, [node]);

  const supportsHover = window.matchMedia('(hover: hover)').matches;

  const select = (
    e: Event,
    next: string,
    targetFrame: number,
    mobile: boolean,
  ) => {
    const btn = e.target as HTMLElement;
    const siblings = btn.parentElement?.children;
    if (siblings) {
      for (let i = 0; i < siblings.length; i++)
        siblings[i].classList.remove('clicked');
    }
    btn.classList.add('clicked');

    if (mobile) {
      setTarget(targetFrame);
      setNext(next);
    } else setTimeout(() => set(next), 100);
  };

  const decisionButtons = (node as DecisionNode).options
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
          onClick={(e) =>
            select(
              e.nativeEvent,
              option.leadsTo,
              targetFrame,
              !supportsHover && isAnimation(node as DecisionNode),
            )
          }
        >
          {option.displayText}
        </button>
      );
    });

  return (
    <TransitionGroup className='dcard-transition-group'>
      {[node].map(node => // hack to trigger the transition
        isDecision(node) ? (
          <CSSTransition key={node.id} classNames='card' timeout={500}>
            <div className='dcard-root'>
              <DecisionCardHeader
                node={node}
                next={next}
                set={set}
                back={back}
                reset={reset}
              />

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
            <div className='dcard-root'>
              <DecisionCardHeader
                node={node}
                next={next}
                set={set}
                back={back}
                reset={reset}
              />

              <div className='dcard-end'>
                {node.class
                  ? (
                    <>
                      <div>
                        Clasificaste {fontName || 'esta familia'} como:
                      </div>
                      <div className='dcard-end-class'>
                        {node.class.split('/').map(part =>
                          part.charAt(0) === '#' ? (
                            <em>{part.substring(1)}</em>
                          ) : (
                            <span>{part}</span>
                          )
                        )}
                      </div>
                    </>
                  )
                  : (
                    <div>
                      No pudimos clasificar {fontName}. Es posible que no entre en ninguna de las categorías.
                    </div>
                  )
                }

                <p>
                  Si pensás que te equivocaste en tu clasificación, podés{' '}
                  <a onClick={() => reset(false)}>volver a empezar</a>
                  , o podés <a onClick={() => reset(true)}>clasificar otra familia</a>.
                </p>
              </div>
            </div>
          </CSSTransition>
        )
      )}
    </TransitionGroup>
  );
};

export default DecisionCard;