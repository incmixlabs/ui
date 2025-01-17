"use client"
import { Button } from "@components/button"
import { useScrollIntoView } from "@mantine/hooks"
import { clx } from "@utils/clx/clx-merge"

export default function DemoUseScrollIntoView() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  })

  const DemoTarget = clx.p()
  const DemoSeparator = clx.div("bg-neutral-500 w-full h-[50vh]")

  return (
    <div className="flex w-full flex-col gap-4">
      <DemoButton scrollIntoView={scrollIntoView}>
        👇 Scroll to target 👇
      </DemoButton>

      <DemoSeparator />
      <DemoTarget ref={targetRef}>Hello there 👋</DemoTarget>
      <DemoSeparator />

      <DemoButton scrollIntoView={scrollIntoView}>
        👆 Scroll to target 👆
      </DemoButton>
    </div>
  )
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

type TODO = any

function DemoButton({ children, scrollIntoView }: TODO) {
  return (
    <Button
      onClick={() =>
        scrollIntoView({
          alignment: "center",
        })
      }
    >
      {children}
    </Button>
  )
}
