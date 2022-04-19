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
  detachAll () {
    for (let i = 0; i < this.roots.length; i++) {
      r360.detachRoot (this.roots[i]);
    }
  }
}
