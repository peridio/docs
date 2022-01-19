import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Tagline 1',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices suscipit velit, consectetur placerat risus rutrum id. Phasellus in sapien eu tortor sagittis egestas. Sed lacinia pulvinar nunc, ut finibus augue congue nec. Etiam neque mauris, volutpat ac hendrerit luctus, ultricies sed velit. Pellentesque feugiat sem eget elit vestibulum maximus.
      </>
    ),
  },
  {
    title: 'Tagline 2',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        In sollicitudin, tellus eget hendrerit porta, diam eros aliquam tortor, ut cursus risus mauris eget diam. Mauris convallis nulla eu arcu pharetra tristique. Mauris sit amet massa lacinia, gravida erat in, facilisis justo. Integer fringilla dictum metus, sit amet gravida metus sagittis quis.
      </>
    ),
  },
  {
    title: 'Tagline 3',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Fusce quis aliquam mi. Sed facilisis, sem in viverra pellentesque, arcu eros interdum ipsum, vel condimentum orci arcu nec nibh. Donec in sem et dolor pretium hendrerit consequat sollicitudin elit. Aliquam et arcu varius, suscipit tellus in, efficitur eros. Cras vitae vulputate tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
