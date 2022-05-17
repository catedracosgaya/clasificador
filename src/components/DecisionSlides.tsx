import React, { useEffect, useState } from 'react';
import testTree from '../assets/decision/testTree';
import { DecisionNode, FinalNode, DecisionTree } from '../utils/DecisionTree';
import DecisionCard from './DecisionCard';

interface DecisionSlidesProps {
  fontName: string;
  resetFont: () => void;
}

function DecisionSlides({ fontName, resetFont }: DecisionSlidesProps) {
  const [history, setHistory] = useState<(DecisionNode | FinalNode)[]>([]);
  const [activeNode, setActiveNode] = useState<DecisionNode | FinalNode>();
  const [tree, setTree] = useState<DecisionTree>([]);

  useEffect(() => {
    const newTree = testTree;

    // Validate new tree
    // TODO

    setTree(newTree);
  }, []);

  useEffect(() => {
    setActiveNode(tree[0]);
  }, [tree]);

  const setActiveById = (id: string): void => {
    const next = tree.find(node => node.id === id);
    if (next) {
      if (activeNode) setHistory([...history, activeNode]);
      setActiveNode(next);
    } else console.error(`setActiveById: node with ID ${id} does not exist.`);
  };

  const goBack = (): void => {
    if (history.length < 1) return;

    setActiveNode(history[history.length - 1]);
    setHistory(history.slice(0, history.length - 1));
  };

  console.log(activeNode?.id);
  return (
    <div className='slides-root'>
      {activeNode &&
        <DecisionCard
          fontName={fontName}
          node={activeNode}
          set={setActiveById}
          back={goBack}
          reset={(font) => {
            setActiveNode(tree[0]);
            if (font) resetFont();
          }} />
      }
    </div>
  );
}

export default DecisionSlides;