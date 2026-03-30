"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type RobotEyesBackdropProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

export function RobotEyesBackdrop({ mouseX, mouseY }: RobotEyesBackdropProps) {
  const orbitX = useTransform(mouseX, [0, 1], [-32, 32]);
  const orbitY = useTransform(mouseY, [0, 1], [-22, 22]);
  const miniPupilX = useTransform(mouseX, [0, 1], [-7, 7]);
  const miniPupilY = useTransform(mouseY, [0, 1], [-6, 6]);
  const circleX = useTransform(mouseX, [0, 1], [-18, 18]);
  const circleY = useTransform(mouseY, [0, 1], [-14, 14]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-5 overflow-hidden">
      <motion.div
        style={{ x: useTransform(orbitX, (v) => v * -0.42), y: useTransform(orbitY, (v) => v * -0.32) }}
        className="absolute right-[10%] top-[14%] hidden lg:block"
      >
        <div className="relative rounded-4xl border border-[#ff2e2e]/55 bg-black/50 p-4 backdrop-blur-xl">
          <motion.div
            style={{ x: circleX, y: circleY }}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff4242]/60 bg-[#140607]/65 shadow-[0_0_28px_rgba(255,26,26,0.35)]"
          />

          <div className="relative z-10 flex items-center gap-4">
            <div className="relative h-14 w-22 rounded-full border border-[#ff6c6c]/45 bg-[#120607]">
              <motion.div
                style={{ x: miniPupilX, y: miniPupilY }}
                className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff1a1a] shadow-[0_0_14px_rgba(255,26,26,0.95)]"
              />
            </div>
            <div className="relative h-14 w-22 rounded-full border border-[#ff6c6c]/45 bg-[#120607]">
              <motion.div
                style={{ x: miniPupilX, y: miniPupilY }}
                className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff1a1a] shadow-[0_0_14px_rgba(255,26,26,0.95)]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_38%,rgba(0,0,0,0.35)_72%)]" />
    </div>
  );
}
