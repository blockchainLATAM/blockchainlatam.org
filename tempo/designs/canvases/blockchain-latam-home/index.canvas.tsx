// @tempo-home — Tempo home canvas (the workspace Run button opens this). Managed marker; do not remove.
import { Canvas, RouteStoryboard } from "tempo-sdk/canvas";

export default function BlockchainLatamHomeCanvas() {
  return (
    <Canvas name="Blockchain LATAM Home">
      <RouteStoryboard
        id="Home"
        name="Landing page"
        route="/"
        layout={{ x: 86, y: -613, width: 1440, height: 1000 }}
      />
    </Canvas>
  );
}
