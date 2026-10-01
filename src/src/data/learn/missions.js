/**
 * The LaunchPad mission sequence shown by <MissionRail>. A mission with
 * `branches` is complete when any one branch is complete.
 */
export const MISSIONS = [
  {
    id: 'first-ota',
    title: 'First OTA',
    description: 'Ship an over-the-air update to a running device.',
    to: '/learn/missions/first-ota',
  },
  {
    id: 'remote-app',
    title: 'Remote App',
    description: 'Reach an app on your device through a secure tunnel.',
    to: '/learn/missions/remote-app',
  },
  {
    id: 'choose-hardware',
    title: 'Choose Hardware',
    description: 'Pick a path and build on real hardware.',
    branches: [
      {
        id: 'pi-gateway',
        title: 'Pi Gateway',
        description: 'Raspberry Pi as an edge gateway.',
        to: '/learn/missions/pi-gateway',
      },
      {
        id: 'jetson-vision',
        title: 'Jetson Vision',
        description: 'Computer vision on NVIDIA Jetson.',
        to: '/learn/missions/jetson-vision',
      },
    ],
  },
]

export function isMissionComplete(mission, completed) {
  if (mission.branches) return mission.branches.some((b) => completed[b.id])
  return Boolean(completed[mission.id])
}

/** Returns the mission (or branch) entry for an id, plus its top-level index. */
export function findMission(id) {
  for (let i = 0; i < MISSIONS.length; i++) {
    const m = MISSIONS[i]
    if (m.id === id) return { mission: m, index: i }
    const branch = m.branches?.find((b) => b.id === id)
    if (branch) return { mission: branch, index: i }
  }
  return null
}
