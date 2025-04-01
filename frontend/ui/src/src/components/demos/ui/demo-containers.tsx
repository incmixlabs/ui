import { clx } from "@/lib/utils/clx/clx-merge";
import { Flex2, Flex4, FlexBetween, FlexCol } from "src/components/ui/containers";

export default function DemoContainers() {
  const Demo = clx.div(
    "flex items-center justify-center w-fit h-full bg-neutral-500 rounded-md px-2",
  );

  return (
    <FlexCol className="min-w-[300px] border  p-2 gap-4 items-center">
      <Flex2>
        <Demo>Flex2</Demo>
        <Demo>Flex2</Demo>
      </Flex2>
      <Flex4>
        <Demo>Flex4</Demo>
        <Demo>Flex4</Demo>
      </Flex4>

      <FlexBetween>
        <Demo>FlexBetween</Demo>
        <Demo>FlexBetween</Demo>
      </FlexBetween>
    </FlexCol>
  );
}
