import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({ formik, serverError }) {
  const { values, handleChange, handleBlur, errors, touched } = formik;

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
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <div className="text-red-500 font-inter text-sm font-normal leading-5">
            {errors.email}
          </div>
        )}
      </Field>
      <Field>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {serverError && touched.email && (
          <div className="text-red-500 font-inter text-sm font-normal leading-5">
            {serverError}
          </div>
        )}
        <div className="flex items-center">
          <a href="#" className=" text-sm underline-offset-2 hover:underline">
            Forgot your password?
          </a>
        </div>
      </Field>
    </div>
  );
}
