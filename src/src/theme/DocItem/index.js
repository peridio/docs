import React from 'react';
import DocItem from '@theme-original/DocItem';
import Heading from '@theme/Heading';
import PropTypes from 'prop-types';

function SpecSheetLayout(props) {
  // Custom layout for spec sheets
  return (
    <div style={{ border: '2px solid red', padding: '20px' }}>
      <Heading as="h1">SPEC SHEET</Heading>
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

DocItemWrapper.propTypes = {
  content: PropTypes.shape({
    metadata: PropTypes.shape({
      route: PropTypes.shape({
        source: PropTypes.string,
      }),
    }),
  }),
};
