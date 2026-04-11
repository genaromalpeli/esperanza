import React from "react";
import { Composition } from "remotion";
import { VefyVideo } from "./VefyVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VefyHome"
        component={VefyVideo}
        durationInFrames={1500}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
