import { ExtendedColorType } from "@components";
import ColorPicker, { ColorSelectType } from "@/components/color-picker";
import { Button, Flex } from "@base"
import { useState } from "react";

export function ColorPickerComponent() {
  const [labelColor, setLabelColor] = useState<ExtendedColorType>("blue");

  const handleColorSelect = (newColor: ColorSelectType) => {  
    if (newColor.name) {  
      setLabelColor(newColor.name as ExtendedColorType);  
    }  
  };  
  return (
    <Flex direction="column" align="center" justify="center" >
      <Button
        variant="solid"
        className="color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12"
        color={(labelColor as ExtendedColorType) || "blue"}
      />
      <ColorPicker colorType="base" onColorSelect={handleColorSelect} />
    </Flex>
  );
}
