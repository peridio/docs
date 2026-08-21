---
title: 'Remote Tunnel'
copy_markdown: true
description: 'Open a secure WireGuard remote access tunnel to an Avocado OS device with Avocado Connect — SSH in, reach Cockpit, or view a web frontend on any port, with no inbound network configuration.'
---

This guide shows how to open a **remote access tunnel** to a deployed Avocado OS device from the **Avocado Connect** console and use it for SSH, a web dashboard, or any other TCP service on the device.

Remote tunnels are a feature of [Avocado Connect](/avocado-connect/overview), the fleet management and device operations platform for Avocado OS. Tunnels are encrypted end to end with **WireGuard** and brokered by Connect's relay infrastructure: the device dials out, so you can reach hardware behind NAT, firewalls, or cellular links with no static IPs, port forwarding, or VPN setup. Every session is audit logged — who connected, when, and for how long.

## Prerequisites

- An Avocado Connect account — sign up for a **free developer account** at [connect.peridio.com/login](https://connect.peridio.com/login)
- A device provisioned with Avocado OS, enrolled in Connect, and showing **Online** — see the [OTA guide](/developer-reference/ota) for the full setup flow
- The device's runtime includes the `avocado-ext-connect` and `avocado-ext-tunnels` extensions (tunnels are gated on device capability)
- To use a tunnel for SSH, the runtime must also run an SSH server (e.g. `avocado-ext-sshd-dev` in development); likewise, Cockpit on port `9090` requires the `avocado-ext-cockpit` extension

## Choose a port

A tunnel forwards one device port to your machine. Common choices:

| Service | Port   | What you get                                                                    |
| ------- | ------ | ------------------------------------------------------------------------------- |
| SSH     | `22`   | A remote shell on the device                                                    |
| HTTP    | `80`   | A web service on the device                                                     |
| HTTPS   | `443`  | A TLS web service on the device                                                 |
| Cockpit | `9090` | The device's web-based management UI                                            |
| Custom  | any    | Anything else listening on the device — e.g. a web frontend on `3000` or `5000` |

Custom ports are where tunnels get interesting beyond a shell: if your application hosts a web frontend (say on port `3000` or `5000`), a tunnel gives you an exact view of what a user standing in front of the device sees — or lets you reach an internal dashboard that is never exposed off-device.

## Open a tunnel

- Open your device in Connect. The **Tunnels** panel lives on the device detail page, and the **Agent** section confirms the device reports **Tunnel Capable: Yes**.

<div className="framed-shot">
  <img
    src="/img/guides/remote-tunnel/connect-device-page.png"
    alt="A device detail page in Avocado Connect: the Tunnels panel with no active tunnels and port shortcuts, a Quick Actions panel with Open SSH Tunnel, and the Agent section reporting Tunnel Capable: Yes."
    loading="lazy"
    decoding="async"
  />
</div>

- Under **New**, pick a standard port — **SSH :22**, **HTTP :80**, **HTTPS :443**, **Cockpit :9090** — or choose **Custom** and enter any port. For SSH there's also the **Open SSH Tunnel** quick action.

<div className="framed-shot">
  <img
    src="/img/guides/remote-tunnel/connect-ports.png"
    alt="The Tunnels panel up close: New tunnel shortcuts for SSH port 22, HTTP port 80, HTTPS port 443, Cockpit port 9090, and Custom, with the Open SSH Tunnel quick action below."
    style={{width: '60%', display: 'block', margin: '0 auto'}}
    loading="lazy"
    decoding="async"
  />
</div>

- Connect establishes the WireGuard tunnel to the device.

<div className="framed-shot">
  <img
    src="/img/guides/remote-tunnel/connect-in-progress.png"
    alt="The Tunnels panel showing one active tunnel being set up: Establishing WireGuard tunnel on port 22, with a progress indicator and a Close action."
    style={{width: '60%', display: 'block', margin: '0 auto'}}
    loading="lazy"
    decoding="async"
  />
</div>

- Once the tunnel is established, Connect shows the connection details — for SSH, copy the ready-made SSH command.

<div className="framed-shot">
  <img
    src="/img/guides/remote-tunnel/connect-established.png"
    alt="The Tunnels panel with a tunnel established on port 22 and a copyable SSH command: ssh -p 62042 root@13.219.213.3."
    style={{width: '60%', display: 'block', margin: '0 auto'}}
    loading="lazy"
    decoding="async"
  />
</div>

## Use the tunnel

- **SSH (port 22)**: run the copied SSH command to get a shell on the device.

<div className="framed-shot">
  <img
    src="/img/guides/remote-tunnel/device-ssh-connected.png"
    alt="A terminal running the copied tunnel command ssh -p 62042 root@13.219.213.3: after accepting the host key, a root shell opens on the Jetson Orin Nano devkit."
    loading="lazy"
    decoding="async"
  />
</div>

- **Web ports (80/443/9090/custom)**: open the tunnel endpoint in your browser. For a device hosting a frontend on port `3000` or `5000`, you see exactly what a local user sees; for Cockpit on `9090`, you get the device's management UI.

### Example: view a device dashboard on a custom port

Say your application serves a dashboard on port `5000` — this example uses the [python-flask reference](https://github.com/avocado-linux/references/blob/main/python-flask/getting_started.md), which hosts a live device dashboard. Choose **Custom**, enter the port, and click **Connect**.

<div className="framed-shot">
  <img
    src="/img/guides/remote-tunnel/connect-custom-port.png"
    alt="The Tunnels panel with Custom selected: a port field containing 5000 and a Connect button."
    style={{width: '60%', display: 'block', margin: '0 auto'}}
    loading="lazy"
    decoding="async"
  />
</div>

Once established, the tunnel shows an endpoint (host and port) instead of an SSH command — copy it.

<div className="framed-shot">
  <img
    src="/img/guides/remote-tunnel/connect-custom-port-established.png"
    alt="The Tunnels panel with a tunnel established on port 5000 and a copyable endpoint: 13.219.213.3:58954."
    style={{width: '60%', display: 'block', margin: '0 auto'}}
    loading="lazy"
    decoding="async"
  />
</div>

Open the endpoint in your browser: the device's dashboard renders live through the tunnel, exactly as it would for someone on the device's own network.

<div className="framed-shot">
  <img
    src="/img/guides/remote-tunnel/hosted-custom-port.png"
    alt="A browser pointed at the tunnel endpoint showing a live device dashboard served from the Jetson: CPU, memory, disk, load, uptime, temperature, and per-interface network throughput."
    loading="lazy"
    decoding="async"
  />
</div>

## Tunnel lifetime

- Tunnels expire automatically after their TTL, so access is temporary by default. Close a tunnel early from the device's Tunnels view in Connect.
- Every tunnel session is recorded for audit: who opened it, to which device and port, and for how long.
- Availability and limits (TTL, concurrency, allowed windows) are governed by your organization's tunnel policy — see the [Remote Access API](/developer-reference/avocado-connect-api/remote-access) for details.
