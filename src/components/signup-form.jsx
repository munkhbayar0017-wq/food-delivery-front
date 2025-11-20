import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({ formik, serverError }) {
  const { values, handleChange, handleBlur, errors } = formik;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Sign up to explore your favorite dishes.
        </p>
      </div>
      <Field>
        <Input
          name="email"
          placeholder="Enter your email address"
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && (
          <div className="text-red-500 font-inter text-sm font-normal leading-5">
            {errors.email}
          </div>
        )}
      </Field>
    </div>
  );
}
