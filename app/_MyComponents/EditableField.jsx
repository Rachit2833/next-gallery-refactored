"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Check, X } from "lucide-react";

export const EditableField = ({
  label,
  value,
  type = "text",
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;

    if (currentValue === value) {
      setIsEditing(false);
      return;
    }

    try {
      setLoading(true);
      await onSave(currentValue); // ✅ async-safe
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-xl">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <Input
            type={type}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="flex-1"
            autoFocus
            disabled={loading}
          />
        ) : (
          <p className="flex-1 px-3 py-2 border rounded-md bg-muted truncate">
            {value}
          </p>
        )}

        {isEditing ? (
          <div className="flex gap-1">
            <Button size="icon" onClick={handleSave} disabled={loading}>
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel} disabled={loading}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
            <Pencil className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};