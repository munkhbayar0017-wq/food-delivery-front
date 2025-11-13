import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start text-center">
        <h1 className="text-2xl font-bold">Log in </h1>
        <p className="text-muted-foreground text-balance">
          Log in to enjoy your favorite dishes.
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
      <Field>
        <Input id="password" type="password" placeholder="Password" required />
        <div className="flex items-center">
          <a href="#" className=" text-sm underline-offset-2 hover:underline">
            Forgot your password?
          </a>
        </div>
      </Field>
    </div>
  );
}
