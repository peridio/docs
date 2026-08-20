# Peridio Docs

[docs.peridio.com](https://docs.peridio.com)

Implements a static documentation website for Peridio.

## Running locally

```bash
make install   # dependencies (root + src/)
make dev       # generate the reference docs, then start the dev server
```

`make dev` runs the sync scripts first — the reference and hardware-target docs
are generated and gitignored, and the site will not boot without them. Once
they exist, `make start` skips straight to the server.

Other useful targets: `make build` (production build), `make serve` (serve the
last build), `make thumbs` (regenerate the Field Notes thumbnails), `make help`
(everything else).

### Previewing on a phone

`npm start` and `npm run serve` bind to the LAN, not just localhost. Once the
site has compiled they print both URLs and a QR code:

```
Preview on your phone

  Local     http://localhost:3000/
  Network   http://192.168.0.2:3000/

  ▄▄▄▄▄▄▄  ▄ ▀▄█ ▄▄▄▄▄▄▄
  ...
```

Scan it with the phone's camera. The phone has to be on the same network, and
the Mac's firewall has to allow incoming connections for `node`. Hot reload
works over the LAN too, so edits show up on the phone as you make them.

Port 3000 is used when free, and the next free port otherwise, so a second
checkout can run alongside the first. Set `PORT` to start somewhere else.

Note that while the server runs, anything else on the network can reach it —
worth knowing on a network you do not trust.
