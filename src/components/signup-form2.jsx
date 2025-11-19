import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

export function SignupForm2({ formik }) {
  const { values, handleChange, handleBlur, errors, touched } = formik;
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
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
          {errors.password && touched.password && (
            <div className="text-red-500 font-inter text-sm font-normal leading-5">
              {errors.password}
            </div>
          )}
          <Field>
            <Input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Confirm"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
          {errors.confirmPassword && touched.confirmPassword && (
            <div className="text-red-500 font-inter text-sm font-normal leading-5">
              {errors.confirmPassword}
            </div>
          )}
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
