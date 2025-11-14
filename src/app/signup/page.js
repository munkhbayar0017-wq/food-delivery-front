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

export default function SignupPage({ className }) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const totalSteps = 2;

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    router.push("/login");
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
                          if (!formData.email) {
                            alert("Please enter your email");
                            return;
                          }
                          nextStep();
                        }
                      : handleSubmit
                  }
                >
                  {currentStep > 1 && (
                    <button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="w-9 h-9 flex items-center justify-center border rounded-md"
                    >
                      <ChevronLeftIcon />
                    </button>
                  )}
                  <FieldGroup>
                    {currentStep === 1 && (
                      <SignupForm
                        formData={formData}
                        setFormData={setFormData}
                      />
                    )}

                    {currentStep === 2 && (
                      <SignupForm2
                        formData={formData}
                        setFormData={setFormData}
                      />
                    )}
                    <Field>
                      <Button type="submit">
                        {currentStep === totalSteps ? "Let's Go" : "Let's Go"}
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
