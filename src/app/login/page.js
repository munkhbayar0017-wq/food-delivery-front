"use client";

import { LoginForm } from "@/components/login-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import Image from "next/image";
import { LoginForm2 } from "@/components/login-form2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginForm3 } from "@/components/login-form3";
import { LoginForm4 } from "@/components/login-form4";

export default function LoginPage({ className }) {
  const [forgetPass, setForgetPass] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const router = useRouter();
  const handleClickSignupButton = () => {
    router.push("/signup");
  };
  const handleClickSendLinkButton = () => {
    setVerifyEmail(true);
  };
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className={cn("flex flex-col gap-6 items-center", className)}>
          <Card className="overflow-hidden p-0 w-[1440px] h-[1024px]">
            <CardContent className="grid p-0 md:grid-cols-2 h-full w-full">
              <div className="flex items-center justify-center">
                <form className="p-6 md:p-8 flex flex-col items-start gap-6 justify-center w-[416px]">
                  <FieldGroup>
                    {!forgetPass && <LoginForm setForgetPass={setForgetPass} />}
                    {forgetPass && <LoginForm2 />}
                    {verifyEmail || (!forgetPass && <LoginForm3 />)}
                    {/* {<LoginForm4 />} */}
                    <Field>
                      <Button type="submit" onClick={handleClickSendLinkButton}>
                        {!forgetPass ? "Let's Go" : "Send link"}
                      </Button>
                    </Field>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <a
                        onClick={handleClickSignupButton}
                        href="#"
                        className="text-[#2563EB]"
                      >
                        Sign up
                      </a>
                    </FieldDescription>
                  </FieldGroup>
                </form>
              </div>
              <div className="bg-muted relative hidden md:block">
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
