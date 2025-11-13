import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({ className, formData, setFormData, ...props }) {
  return (
    <div>
      <div className="flex flex-col items-start gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Sign up to explore your favorite dishes.
        </p>
      </div>
      <Field>
        <FieldLabel htmlFor="email"></FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Field>
    </div>
  );
}
