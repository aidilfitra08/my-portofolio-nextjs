"use client";

import { ReactNode } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

type TwoPanelResizableProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  handleClassName?: string;
  defaultLeftSize?: number | string;
  minLeftSize?: number | string;
  minRightSize?: number | string;
};

export default function TwoPanelResizable({
  left,
  right,
  className,
  handleClassName,
  defaultLeftSize = 50,
  minLeftSize = 20,
  minRightSize = 20,
}: TwoPanelResizableProps) {
  return (
    <Group orientation="horizontal" className={className}>
      <Panel minSize={minLeftSize} defaultSize={defaultLeftSize}>
        {left}
      </Panel>

      <Separator
        className={
          handleClassName ??
          "w-6 items-center justify-center cursor-col-resize select-none touch-none flex"
        }
      >
        <div className="h-full w-0.5 bg-neutral-400 dark:bg-accent-green/70" />
      </Separator>

      <Panel minSize={minRightSize}>{right}</Panel>
    </Group>
  );
}
