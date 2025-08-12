# System integrations

Peridio provides agents and reference designs for the following systems:

- [Avocado Linux](/dev-center/avocado-linux/getting-started)
- [Linux](linux/overview)
- [Android](android/overview)

## Agent

An agent is a term used to describe a stateful process running on a device that is communicating with Peridio Cloud. The agent process is responsible for managing the device identity, communicating with Peridio Cloud, and managing / applying updates to the device. Peridio reference designs will include a reference agent in each integration. These reference integrations will prescribe opinions about the layout of partition table, the last mile delivery tools, userspace and kernel dependencies and more. While they are the easiest way to get started, they are also the most opinionated. You can choose to implement your own agent process if you require greater control or require functionality the reference agents do not provide.
