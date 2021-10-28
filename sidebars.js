/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    'reference-introduction',
    {
      type: 'category', label: 'Reference', items: [
        {
          type: 'category',
          label: 'Nodes',
          items: [
            'reference/nodes/node',
            'reference/nodes/node-type',
            'reference/nodes/node-element-resolution-strategy'
          ]
        },
        {
          type: 'category',
          label: 'Elements',
          items: [
            'reference/elements/element',
            'reference/elements/element-type',
            'reference/elements/element-type-version',
            'reference/elements/element-binary',
            'reference/elements/element-type-version-set',
            'reference/elements/element-uniqueness-strategy',
          ],
        },
        {
          type: 'category',
          label: 'Distributions',
          items: [
            'reference/distributions/distribution-channel',
            'reference/distributions/distribution-step-type',
            'reference/distributions/distribution-step',
          ]
        }
      ]
    }
  ],
  guides: [
    'guides',
    'guides/quickstart',
  ],
};

module.exports = sidebars;
