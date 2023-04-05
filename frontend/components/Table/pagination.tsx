import { getProduct } from "@/store/slices/Product/product.selector";
import { setProductTable } from "@/store/slices/Product/product.slice";
import { IProductProps } from "@/types/product.types";
import {
  Divider,
  Flex,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Pagination = ({ data, ...props }: { data: IProductProps }) => {
  const { limit } = useSelector(getProduct);
  const dispatch = useDispatch();

  const UnderlineText = ({
    name,
    ...props
  }: {
    name: string;
    onClick?: () => void;
  }) => {
    return (
      <Text
        cursor={"pointer"}
        _hover={{ color: "blue.800", textDecoration: "underline" }}
        {...props}
      >
        {name}
      </Text>
    );
  };

  return (
    <Flex justifyContent="space-between">
      <Select
        w="68px"
        bgColor={useColorModeValue("white", "gray.700")}
        color={useColorModeValue("gray.800", "white")}
        border={"none"}
        onChange={(event) => {
          dispatch(
            setProductTable({ limit: event.target.value, currentPage: 1 })
          );
        }}
      >
        <option selected>{limit}</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </Select>

      <Flex gap={4} alignItems={"center"}>
        {/**
         * First: Go to first page (button indicator)
         */}
        {data.current_page === 1 ? (
          <Text cursor={"not-allowed"} color="gray.800">
            First
          </Text>
        ) : (
          <UnderlineText
            name="First"
            onClick={() => dispatch(setProductTable({ currentPage: 1 }))}
          />
        )}
        <Divider orientation="vertical" h="20px" />

        {/**
         * Prev: Go to prev page (button indicator)
         */}
        {data.current_page === 1 ? (
          <Text cursor={"not-allowed"} color="gray.800">
            Prev
          </Text>
        ) : (
          <UnderlineText
            name="Prev"
            onClick={() =>
              dispatch(setProductTable({ currentPage: data.current_page - 1 }))
            }
          />
        )}
        <Divider orientation="vertical" h="20px" />

        {/**
         * Display the current page
         */}
        <UnderlineText name={`${data.current_page}`} />
        <Divider orientation="vertical" h="20px" />

        {/**
         * Next: Go to the next page (button indicator)
         */}
        {data.current_page === data.last_page ? (
          <Text cursor={"not-allowed"} color="gray.800">
            Next
          </Text>
        ) : (
          <UnderlineText
            name="Next"
            onClick={() =>
              dispatch(setProductTable({ currentPage: data.current_page + 1 }))
            }
          />
        )}
        <Divider orientation="vertical" h="20px" />

        {/**
         * Last: Go to the last page (button indicator)
         */}
        {data.current_page === data.last_page ? (
          <Text cursor={"not-allowed"} color="gray.800">
            Last
          </Text>
        ) : (
          <UnderlineText
            name="Last"
            onClick={() =>
              dispatch(setProductTable({ currentPage: data.last_page }))
            }
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Pagination;
