import React from "react";
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface IBreadcrumb {
  data: {
    name: string;
    url: string;
  }[];
}

export const Breadcrumb = (props: IBreadcrumb) => {
  return (
    <ChakraBreadcrumb
      spacing="8px"
      pl={0.5}
      separator={
        <ChevronRightIcon color={useColorModeValue("white", "gray.700")} />
      }
    >
      {props.data.map((breadcrumb, index) => {
        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={breadcrumb.url}>
              {breadcrumb.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </ChakraBreadcrumb>
  );
};
