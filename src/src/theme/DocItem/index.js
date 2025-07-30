import React from 'react';
import DocItem from '@theme-original/DocItem';

function SpecSheetLayout(props) {
  // Custom layout for spec sheets
  return (
    <div style={{ border: '2px solid red', padding: '20px' }}>
      <h1>SPEC SHEET</h1>
      <DocItem {...props} />
    </div>
  );
}

export default function DocItemWrapper(props) {
  const { route } = props.content.metadata;

  if (route && route.source.includes('solutions')) {
    return <SpecSheetLayout {...props} />;
  }

  return <DocItem {...props} />;
}
