# Getting Started

The fastest way to go from new hardware on your desk to production devices in the field.

The getting started guides walk you through the essential workflows for embedded Linux development with Avocado OS and Peridio Core — from initial device provisioning through rapid iteration and deployment. You'll learn the core concepts and practical techniques that form the foundation of professional embedded product development.

Whether you're starting with an evaluation kit or scaling commodity-grade hardware into millions of devices, our goal is simple: remove the uncertainty, delays, and frustration that traditionally slow down embedded product teams.

## Why We Built It

The embedded Linux ecosystem wasn't just hard — it was stuck in the past. While web and mobile teams iterate daily and collaborate seamlessly, embedded teams were dealing with multi-hour build cycles, cryptic error messages, and "works on my machine" nightmares.

We believed the bar should be higher. Embedded developers deserve the same rapid iteration, clear feedback loops, and collaborative workflows that other software teams take for granted. More importantly, the tools shouldn't be the bottleneck when cross-functional teams work together across the entire product lifecycle.

That's why we built Avocado OS and Peridio Core — not just to make Yocto easier or updates more reliable, but to fundamentally transform how teams build and ship embedded products. Fast builds, clear errors, shareable environments, and instant deployment. The developer experience you've always wanted, finally available for embedded systems.

## What You'll Find Here

This Getting Started section is your roadmap from first boot to production deployment. Each guide builds on the previous one, teaching you the core workflows that will become second nature as you develop and maintain your embedded Linux products:

1. **[Provision a Device](/getting-started/provision-device)** – Start with a QEMU virtual machine to experience the full Avocado OS workflow without waiting for hardware. You'll create your first project, build a custom image, and boot into a fully functional system in under 10 minutes.

2. **[Hardware in the Loop](/getting-started/hardware-in-the-loop)** – Building on your provisioned device, discover how to iterate at web development speeds on embedded systems. Mount your code directly into the running QEMU device over NFS, see changes instantly without rebuilding, and maintain the same immutable deployment model for production.

3. **[Sideload an Update](/getting-started/desktop-deploy)** – Apply the development techniques you've learned to real hardware with a Raspberry Pi 4. Using the same project structure and extensions from previous guides, push updates directly from your workstation to the running device — no SD card removal or update server required.

Each guide introduces essential concepts and tools you'll use throughout your product lifecycle. The workflows are intentionally production-oriented — what you learn here scales directly from prototype to millions of deployed devices.

## What You'll Be Able to Do

By the end of these guides, you'll have practical experience with the core Avocado OS and Peridio workflows: provisioning devices from scratch, developing with live hardware feedback, and deploying updates safely to physical devices.

You'll understand how to build deterministic images that work identically across your team, package applications as composable extensions, and push updates without risking bricked devices. These aren't just demos — they're the same patterns and tools you'll use in production, whether you're managing one prototype or a fleet of devices.
