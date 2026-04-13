---
title: Getting Started
description: Get started with Avocado OS on your target hardware.
sidebar_position: 0
hide_table_of_contents: true
---

import LinkCardGrid, { LinkCard } from '@site/src/components/LinkCardGrid'

# Getting Started

Welcome to Avocado OS. Choose a target platform below to get up and running.

<LinkCardGrid>
  <LinkCard
    href="/getting-started/qemu"
    title="QEMU"
    description="No hardware required. Run Avocado OS in a virtual machine on your development machine."
    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>}
  />
  <LinkCard
    href="/getting-started/raspberry-pi"
    title="Raspberry Pi 5"
    description="Build and deploy to a Raspberry Pi 5 using an SD card."
    logo="/img/logos/raspberry-pi.svg"
  />
  <LinkCard
    href="/getting-started/jetson"
    title="NVIDIA Jetson Orin Nano"
    description="Flash Avocado OS to a Jetson Orin Nano Developer Kit over USB."
    logo="/img/logos/nvidia.svg"
    logoAlt="NVIDIA"
  />
  <LinkCard
    href="/getting-started/any-target"
    title="Any Supported Target"
    description="Generic instructions for any hardware in the support matrix."
    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>}
  />
</LinkCardGrid>
