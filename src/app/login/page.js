"use client";

import { LoginForm } from "@/components/login-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage({ className }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setServerError("");
        const response = await axios.post(
          "http://localhost:168/authentication/login",
          {
            email: values.email,
            password: values.password,
          }
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("email", response.data.user.email);

        const role = response.data.user.role;

        const isAdmin = role === "ADMIN";
        // console.log("Push to homepage success");
        toast.success("Login successful!");
        if (!isAdmin) {
          router.push("/");
        } else {
          router.push("/admin");
        }
      } catch (error) {
        // console.log(error.response?.data);
        toast.error(error.response?.data || "User not found");
        setServerError(error.response?.data);
      }
    },
  });
  const { values, errors } = formik;
  const handleClickSignupButton = () => {
    router.push("/signup");
  };
  const handleClickChevronButton = () => {
    router.push("/");
  };
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className={cn("flex flex-col gap-6 items-center", className)}>
          <Card className="overflow-hidden p-0 w-[1440px] h-[1024px]">
            <CardContent className="grid p-0 md:grid-cols-2 h-full w-full">
              <div className="flex items-center justify-center">
                <form
                  onSubmit={formik.handleSubmit}
                  className="p-6 md:p-8 flex flex-col items-start gap-6 justify-center w-[416px]"
                >
                  <div
                    className="w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer  hover:bg-gray-200 hover:text-black transition-colors duration-200"
                    onClick={handleClickChevronButton}
                  >
                    <ChevronLeftIcon />
                  </div>
                  <FieldGroup>
                    <LoginForm formik={formik} />
                    <Field>
                      <Button
                        type="submit"
                        disabled={
                          errors.email ||
                          !values.email ||
                          errors.password ||
                          !values.password
                        }
                        className="cursor-pointer"
                      >
                        Let&apos;s go
                      </Button>
                    </Field>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?
                      <a
                        onClick={handleClickSignupButton}
                        href="#"
                        className="text-[#2563EB] pl-1"
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
