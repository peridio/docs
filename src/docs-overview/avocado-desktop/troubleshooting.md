---
title: 'Troubleshooting'
description: 'Fixes for common Avocado Desktop problems, starting with provisioning that never finds the board.'
---

# Troubleshooting

## The VM won't start on macOS

The build VM runs on QEMU, which doesn't come with the app. Install it with `brew install qemu`, then click **Start** on the **Overview** pane. The **Getting started** card shows what is still missing.

## Build says "up to date" after a change

Desktop's build stamps missed the change. Open **Install**, check **Reinstall from scratch**, and run it. Then build again.

## A run is stuck, or a new run says another is in progress

A project runs one action at a time. Wait for the current run, or click **Cancel**. If no run is active but the build stays locked, use **More → Unlock**.

## Provisioning waits and never finds the board

The board is plugged in, but Desktop hasn't passed it through to the VM. Known devkits pass through by default; any other hardware needs enabling the first time.

Open **Devices** in the sidebar, find the board's row and turn its toggle on. Provision once the row shows `attached`. See [USB devices](/avocado-desktop/usb-devices).

## The flash starts, then stalls partway

The board came back as a different USB device for a later flash stage, and that device isn't enabled yet. Open **Devices**, turn on the new row, and provision again. See [Hardware that changes USB ID while flashing](/avocado-desktop/usb-devices#hardware-that-changes-usb-id-while-flashing).

## A flash hangs at "waiting for USB storage device" on macOS

Desktop doesn't have the macOS **Removable Volumes** permission. Some hardware appears as a USB drive during a flash, and Desktop needs that permission to pass a USB drive through. macOS asks for it the first time. If you denied or dismissed the prompt, the flash hangs at this step without saying why.

Turn on **Removable Volumes** for Avocado under **System Settings → Privacy & Security → Files and Folders**, then provision again.

## Running the provision script on macOS fails

Don't copy a runtime out of the VM and run its `stone-provision-*.sh` script on macOS. Provision scripts expect Linux tools that macOS doesn't have, such as `fw_setenv`. Run `avocado provision` from Desktop. It runs the script in the VM, with your hardware passed through.

## A device is stuck in `attaching`

After 60 seconds, the attach times out and the row shows an error. Click **↻** on the row to try again.

If that fails too, unplug the board and plug it back in. If it still fails, look for the attach error in the **Events** pane. On Linux, the **USB devices** pane also says whether `pkexec` or the `usbip` tools are missing.

## The board's USB network or serial console disappears from your computer

You enabled a USB device that the running board also uses, so Desktop passed it to the VM. Turn off the row's toggle to keep the device on your computer.

The generic Linux gadget, `1d6b:0104`, is the exception. See [The generic Linux gadget stays on your computer](/avocado-desktop/usb-devices#the-generic-linux-gadget-stays-on-your-computer).
