import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm2() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset your password </h1>
        <p className="text-muted-foreground text-balance">
          Enter your email to receive a password reset link.
        </p>
      </div>
      <Field>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          required
        />
      </Field>
    </div>
  );
}
