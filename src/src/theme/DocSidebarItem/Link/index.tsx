import ContentSectionTag from '@site/src/components/ContentSectionTag';
import IconExternalLink from '@theme/Icon/ExternalLink';
import Link from '@docusaurus/Link';
import React from 'react';
import clsx from 'clsx';
import isInternalUrl from '@docusaurus/isInternalUrl';
import type { Props } from '@theme/DocSidebarItem/Link';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/theme-common/internal';

import styles from './styles.module.css';

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): JSX.Element {
  const { customProps, href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        {label}
        {!isInternalLink && <IconExternalLink />}
        &nbsp;
        {customProps && customProps.legacy && <ContentSectionTag type='legacy' />}
        {customProps && customProps.labs && <ContentSectionTag type='labs' />}
        {customProps && customProps.new && <span className={styles.new}>New</span>}
      </Link>
    </li>
  );
}
