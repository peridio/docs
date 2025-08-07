import React from 'react';
import styles from './styles.module.css';

const industries = [
  { name: 'Robotics', icon: 'precision_manufacturing' },
  { name: 'Automotive', icon: 'directions_car' },
  { name: 'Drones', icon: 'flight' },
  { name: 'Medical', icon: 'medical_services' },
  { name: 'Industrial', icon: 'factory' },
  { name: 'Agriculture', icon: 'agriculture' },
];

function IndustriesBar() {
  return (
    <div className={styles['industries-bar']}>
      <h2 className={styles['industries-main-title']}>Built for your industry</h2>
      <div className={styles['industries-title']}>Solutions for every sector</div>
      <div className={styles['industries-container']}>
        {industries.map((industry) => (
          <div key={industry.name} className={styles['industry-item']}>
            <span className={`material-symbols-outlined ${styles['industry-icon']}`}>
              {industry.icon}
            </span>
            <span>{industry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndustriesBar;
