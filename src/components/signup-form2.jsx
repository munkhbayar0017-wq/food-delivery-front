import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

export function SignupForm2({ className, formData, setFormData, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a strong password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <Field>
        <Field className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.confirmPassword || ""}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </Field>
        </Field>
        <div className="flex gap-2">
          <Checkbox
            id="show-password"
            checked={showPassword}
            onCheckedChange={(checked) => setShowPassword(!!checked)}
          />
          <FieldDescription>Show password</FieldDescription>
        </div>
      </Field>
    </div>
  );
}
