// The mission sequence ported from Avocado Connect's LaunchPad rail. The ids
// are the keys stored in Learn progress and sent with analytics events, so
// renaming one resets that mission for every reader.

/** Missions everyone does, in order. */
export const SHARED_MISSIONS = [
  {
    id: 'first-ota',
    title: 'First OTA',
    description:
      'Go from zero to a verified over-the-air update: spin up a QEMU device, connect it, ship a change, and watch it land.',
    to: '/learn/missions/first-ota',
  },
  {
    id: 'remote-app',
    title: 'Remote App',
    description:
      'Cross-compile a React app, deploy it to your device, and open its UI through a remote tunnel.',
    to: '/learn/missions/remote-app',
  },
]

/** The final step branches by hardware. Finishing either one completes it. */
export const HARDWARE_MISSIONS = [
  {
    id: 'pi-gateway',
    title: 'Pi Gateway',
    description:
      'Build a Python telemetry agent on Raspberry Pi 5, publish sensor data over MQTT, and view it live.',
    to: '/learn/missions/pi-gateway',
  },
  {
    id: 'jetson-vision',
    title: 'Jetson Vision',
    description:
      'Run NVIDIA DeepStream natively on a Jetson Orin Nano, then watch live people detection from a USB camera through an Avocado Connect tunnel.',
    to: '/learn/missions/jetson-vision',
  },
]
