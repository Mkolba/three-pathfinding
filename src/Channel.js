import { Utils } from './Utils';
import {MathUtils, Vector3} from "three";

class Channel {
  constructor () {
    this.portals = [];
  }

  push (p1, p2) {
    if (p2 === undefined) p2 = p1;
    this.portals.push({
      left: p1,
      right: p2
    });
  }

  stringPull () {
    const portals = this.portals;
    const pts = [];
    // Init scan state
    let portalApex, portalLeft, portalRight;
    let apexIndex = 0,
      leftIndex = 0,
      rightIndex = 0;

    portalApex = portals[0].left;
    portalLeft = portals[0].left;
    portalRight = portals[0].right;

    // Add start point.
    pts.push(portalApex);

    for (let i = 1; i < portals.length; i++) {
      const left = portals[i].left;
      const right = portals[i].right;

      pts.push(new Vector3(
        MathUtils.lerp(left.x, right.x, 0.5),
        MathUtils.lerp(left.y, right.y, 0.5),
        MathUtils.lerp(left.z, right.z, 0.5)
      ));
    }

    if ((pts.length === 0) || (!Utils.vequal(pts[pts.length - 1], portals[portals.length - 1].left))) {
      // Append last point to path.
      pts.push(portals[portals.length - 1].left);
    }

    this.path = pts;
    return pts;
  }
}

export { Channel };
