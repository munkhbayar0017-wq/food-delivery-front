import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm3() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2 text-center">
        <h1 className="text-2xl font-bold">Please verify Your Email </h1>
        <p className="text-muted-foreground text-balance">
          We just sent an email to Test@gmail.com. Click the link in the email
          to verify your account.
        </p>
      </div>
    </div>
  );
}
