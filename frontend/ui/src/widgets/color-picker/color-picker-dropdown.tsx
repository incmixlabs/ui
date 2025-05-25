import { ExtendedColorType } from "@/components";
import { ComboBox } from "@/components/kanban-board/combo-box";
import { useRef, useState } from "react";
export const labelsData = [
  {
    value: "design",
    label: "Design",
    color: "purple",
  },
  {
    value: "frontend",
    label: "Frontend",
    color: "blue",
  },
  {
    value: "backend",
    label: "Backend",
    color: "indigo",
  },
];
export function ColorPickerDropdown() {
    const [selectedLabels, setSelectedLabels] = useState<string[]>([
    "design",
    "frontend",
    "backend",
  ]);
  const [allLabelsData, setAllLabelsData] = useState(labelsData);
  const [isLabelFormOpen, setIsLabelFormOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null as unknown as HTMLFormElement);
  const [labelColor, setLabelColor] = useState<ExtendedColorType>("blue");

  const handleAddNewLabel = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const labelName = formData.get("labelName") as string;

    if (!labelName.trim()) return;

    const newLabel = {
      value: labelName.toLowerCase().replace(/\s+/g, "-"),
      label: labelName,
      color: labelColor || "blue",
    };

    setAllLabelsData([...allLabelsData, newLabel]);
    // Reset form and close it
    formRef.current.reset();
    setIsLabelFormOpen(false);
  };
  return (
    <>
    <ComboBox
      options={allLabelsData}
      onValueChange={setSelectedLabels}
      defaultValue={selectedLabels}
      placeholder="Search Label"
      title="Labels"
      addNewLabel={true}
      isLabelFormOpen={isLabelFormOpen}
      formRef={formRef}
      setIsLabelFormOpen={setIsLabelFormOpen}
      handleAddNewLabel={handleAddNewLabel}
      labelColor={labelColor}
      setLabelColor={setLabelColor}
    />
    </>

  );
}
