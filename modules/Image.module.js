import {Surface, Module} from 'react-360-web';

import * as LocationService from '../services/location.service';
import {r360} from '../client';

export class ImageModule extends Module {
  constructor () {
    super ('ImageModule');
  }

  roots = [];
  surfaces = [];

  setTooltips (location) {
    this.detachAll ();

    const tooltips = LocationService.getListImages (location);

    tooltips.map ((item, index) => {
      this.surfaces.push (
        new Surface (item.width, item.height, Surface.SurfaceShape.Flat)
      );
      this.surfaces[index].setAngle (item.yaw, item.pitch);
      this.roots.push (
        r360.renderToSurface (
          r360.createRoot ('ImageComponent', {
            width: item.width,
            height: item.height,
            yaw: item.yaw,
            pitch: item.pitch,
            iconImg: 'icons/test.png',
            index: index,
            text: item.text,
            infoImg: item.img,
          }),
          this.surfaces[index]
        )
      );
    });
  }

  resizeTooltip (index, width, height) {
    this.surfaces[index].resize (width, height);
  }
  reangleTooltip (index, yaw,pitch) {
      this.surfaces[index].setAngle (yaw, pitch);
  }
  reangleTooltipFollowCam(index) {
    qx = r360._cameraQuat[0];
    qy=r360._cameraQuat[1];
    qz = r360._cameraQuat[2];
    qw = r360._cameraQuat[3];
    var rollcal  = Math.atan2(2*qy*qw - 2*qx*qz, 1 - 2*qy*qy - 2*qz*qz);
    var pitchcal = Math.atan2(2*qx*qw - 2*qy*qz, 1 - 2*qx*qx - 2*qz*qz);
    var yawcal   =  Math.asin(2*qx*qy + 2*qz*qw);
    this.surfaces[0].setAngle(-rollcal, pitchcal);
    console.log(r360._cameraQuat);
    console.log(yawcal);
    console.log(pitchcal);
    console.log(rollcal);
  }
  detachAll () {
    for (let i = 0; i < this.roots.length; i++) {
      r360.detachRoot (this.roots[i]);
    }
  }
}
