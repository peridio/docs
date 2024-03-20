import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

function LabsAdmonition(props) {
  return (
    <div className="alert" style={{
      borderLeft: 'var(--ifm-alert-border-left-width) solid purple', background: 'lavender', padding: 16, marginBottom: '16px'
    }}>
      <h5 style={{ alignItems: 'center', display: 'flex', textTransform: 'uppercase' }}>
        <svg style={{ marginRight: '0.4em' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="19.6px" ><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
        {props.title || 'labs'}
      </h5>
      <div className="admonitionContent_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-Layout-styles-module" >
        <p>This functionality is only available to select organizations participating in the Peridio closed beta program.</p>

        <p>Subject to breaking changes prior to general availability.</p>

        {props.children}

        <span>For more information, see <a href="/platform/introduction#labs">content labels</a>.</span>
      </div>
    </div >
  );
}

function LegacyAdmonition(props) {
  return (
    <div className="alert" style={{
      borderLeft: 'var(--ifm-alert-border-left-width) solid chocolate', background: 'burlywood', padding: 16, marginBottom: '16px'
    }}>
      <h5 style={{ alignItems: 'center', display: 'flex', textTransform: 'uppercase' }}>
        <svg style={{ marginRight: '0.4em' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="19.6px"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
        {props.title || 'legacy'}
      </h5>
      <div className="admonitionContent_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-Layout-styles-module" >
        <p>This functionality is not available to new organizations.</p>

        {props.children}

        <span>For more information, see <a href="/platform/introduction#legacy">content labels</a>.</span>
      </div>
    </div >
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  'labs': LabsAdmonition,
  'legacy': LegacyAdmonition,
};

export default AdmonitionTypes;
