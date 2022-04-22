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
  reference: [
    'reference/accounts',
    'reference/api-keys',
    'reference/authentication-identities',
    'reference/distributions',
    'reference/elements',
    'reference/members',
    'reference/nerves',
    'reference/node-groups',
    'reference/nodes'
  ],
  guides: [
    'guides/accepting-an-invite',
    'guides/logging-in',
    'guides/creating-an-api-key',
    'guides/using-an-api-key'
  ],
  cli: [
    'cli/authentication'
  ]
};

module.exports = sidebars;
