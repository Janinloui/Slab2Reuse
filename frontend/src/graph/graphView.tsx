// CytoscapeGraph.tsx
import CytoscapeComponent from 'react-cytoscapejs';

export const GraphView = () => {
  const elements = [
    { data: { id: 'one', label: 'Component 1' } },
    { data: { id: 'two', label: 'GeometryType' } },
    { data: { source: 'one', target: 'two', label: 'Edge from 1 to 2' } }
  ];

    const stylesheet = [
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'font-size': 9, 
        'text-valign': 'top',         // Position label above node
        'text-margin-y': -5 
      }
    }
  ];

  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: '600px', height: '400px' }}
      layout={{ name: 'grid'}}
      stylesheet={stylesheet}
    />
  );
};
