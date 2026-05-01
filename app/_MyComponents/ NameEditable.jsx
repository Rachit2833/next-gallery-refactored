"use client";

import { EditableField } from "@/app/_MyComponents/EditableField";
import { useToast } from "@/hooks/use-toast";
import { updateUserNameAction } from "@/app/_lib/actions";
import { useRouter } from "next/navigation";

export function NameEditable({ user }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleSave = async (newName) => {
    try {
      await updateUserNameAction(user._id, newName);

      toast({
        title: "Success",
        description: "Name updated successfully",
      });

      router.refresh(); // 🔥 refresh server data
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update",
        variant: "destructive",
      });
    }
  };

  return (
    <EditableField
      label="Name"
      value={user.name}
      onSave={handleSave}
    />
  );
}