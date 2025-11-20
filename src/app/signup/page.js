"use client";

import { SignupForm } from "@/components/signup-form";
import { SignupForm2 } from "@/components/signup-form2";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function SignupPage({ className }) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const signupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must contain at least one special character"
      ),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords not match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        setServerError("");
        await axios.post("http://localhost:168/authentication/sign-up", {
          email: values.email,
          password: values.password,
        });
        console.log("Account success");
        toast.success("Account created successfully!");
        router.push("/login");
      } catch (error) {
        console.log("User already exists");
        toast.error(error.response?.data || "User already exists");
        setServerError(error.response?.data);
      }
    },
  });
  const { values, errors } = formik;
  const totalSteps = 2;

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const handleClickChevronButton = () => {
    if (currentStep === 1) {
      router.push("/");
    } else {
      prevStep();
    }
  };
  const handleClickLoginButton = () => {
    router.push("/login");
  };
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className={cn("flex flex-col gap-6 items-center", className)}>
          <Card className="overflow-hidden p-0 w-[1440px] h-[1024px]">
            <CardContent className="grid p-0 md:grid-cols-2 h-full w-full">
              <div className="flex items-center justify-center">
                <form
                  className="p-6 md:p-8 flex flex-col items-start gap-6 justify-center w-[416px]"
                  onSubmit={
                    currentStep === 1
                      ? (e) => {
                          e.preventDefault();
                          if (!values.email) {
                            alert("Please enter your email");
                            return;
                          }
                          nextStep();
                        }
                      : formik.handleSubmit
                  }
                >
                  <button
                    type="button"
                    variant="outline"
                    onClick={handleClickChevronButton}
                    className="w-9 h-9 flex items-center justify-center border rounded-md cursor-pointer  hover:bg-gray-200 hover:text-black transition-colors duration-200"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <FieldGroup>
                    {currentStep === 1 && (
                      <SignupForm formik={formik} serverError={serverError} />
                    )}
                    {currentStep === 2 && <SignupForm2 formik={formik} />}
                    <Field>
                      <Button
                        type="submit"
                        disabled={errors.email || !values.email}
                        className="cursor-pointer"
                      >
                        Let&apos;s go
                      </Button>
                    </Field>

                    <FieldDescription className="text-center flex justify-center gap-1">
                      Already have an account?
                      <a
                        onClick={handleClickLoginButton}
                        href="#"
                        className="text-[#2563EB]"
                      >
                        Log in
                      </a>
                    </FieldDescription>
                  </FieldGroup>
                </form>
              </div>
              <div className="bg-muted relative hidden md:block w-full h-full">
                <Image
                  src="/SignPhoto.jpg"
                  alt="My Picture"
                  fill
                  className="object-cover rounded-r-lg"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
