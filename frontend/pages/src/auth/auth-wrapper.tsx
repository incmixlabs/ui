
import React from "react";
import {  Checkbox,  TextInput } from "@incmix/ui/checkbox";
import { Button } from "@incmix/ui/button";
import { FlowCard as Card, Image } from "@incmix/ui/flow-card";
import { Label} from "@incmix/ui/label";
import {Link} from "@tanstack/react-router";

export type AuthWrapperProps = {
  image?: string;
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
}

export const AuthWrapper : React.FC<AuthWrapperProps> = ({image='step1', title, subTitle, children}: AuthWrapperProps) {
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 pt-8 md:h-screen">
      <Link
        href="/"
        className="mb-8 flex items-center justify-center text-2xl font-semibold lg:mb-10 dark:text-white"
      >
        <Image
          imgAlt=""
          imgSrc="/images/logo.svg"
          width={43}
          height={44}
          className="mr-4 h-11"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          {title}
        </span>
      </Link>
      <Card
        horizontal
        imgSrc={`/images/onboarding/${image}`}
        imgAlt=""
        className="w-full md:max-w-screen-lg"
        theme={{
          root: {
            children: "my-auto w-full gap-0 space-y-8 p-6 sm:p-8 lg:p-16",
          },
          img: {
            horizontal: {
              on: "hidden rounded-l-lg md:w-96 md:p-0 lg:block",
            },
          },
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
          {subTitle}
        </h2>
        {children}
      </Card>
    </div>
  );
}
