Use your phones rotation to control a 3D Mesh on your PC.

# Initial install
1. Have both devices in the same network (e.g. by having your phone host a wifi hotspot).
2. Find the IP of the device that runs the backend service and set the IP in the `/frontend` and `/phone` folders.
# Getting started
1. Run `node backend.js` in `nui/` on the backend service device.
2. Run `npm start` in `nui/phone`
3. Run `npm start` in `nui/frontend/`
4. Open {IPv4-Address of your backend device + ":3000"} on your Smartphone.
5. Select the start button on both the phone and PC software
