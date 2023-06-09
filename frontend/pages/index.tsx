import React from "react";
import ENDPOINTS from "@/api/API";
import { Breadcrumb } from "@/components/Breadcrumb";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { BREADCRUMB_DATA } from "@/data/breadcrumb.data";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { getProduct } from "@/store/slices/Product/product.selector";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "@/lib/axios";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export type FormValues = {
  code?: string;
  name?: string;
  category?: string;
  brand?: string;
  type?: string;
  description?: string;
};

export default function Home() {
  const { currentPage, limit } = useSelector(getProduct);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const {
    data: products,
    error,
    isLoading,
  } = useSWR(ENDPOINTS.getProducts(currentPage, limit), fetcher);

  const onSubmit = (data: FormValues) => {
    axios
      .post("/api/v1/products", data)
      .then((res) => {
        toast({
          title: "Product created",
          description: "The product is now created.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch((err) => {
        console.log("error in request", err);
        toast({
          title: "There is error while submitting.",
          description: err,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      });

    onClose();
  };

  if (error) return "An error has occurred.";

  return (
    <>
      <Header title={"List table"} />
      <Box
        bg={useColorModeValue("#987EFF", "gray.700")}
        h="100vh"
        w="full"
        color="white"
      >
        <Flex justifyContent="center">
          <Flex flexDir="column" gap={5} pt={5} w="calc(100vw - 20%)">
            <Flex flexDir="column" gap={2}>
              <Flex justifyContent="space-between" alignItems="end">
                <Box>
                  <Heading
                    size="2xl"
                    color={useColorModeValue("white", "white")}
                  >
                    Products
                  </Heading>
                  <Breadcrumb data={BREADCRUMB_DATA} />
                </Box>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="green"
                  variant="solid"
                  onClick={onOpen}
                >
                  Create
                </Button>
              </Flex>
              {isLoading ? "Loading..." : <Table data={products} />}
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Product</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={errors.code ? true : false}>
                <FormLabel htmlFor="code">Code*</FormLabel>
                <Input
                  id="code"
                  placeholder="P123"
                  {...register("code", {
                    required: "The code field is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.code && errors.code.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.name ? true : false}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Red Dinner Gown"
                  {...register("name", {
                    required: "The name field is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.category ? true : false}>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                  id="category"
                  placeholder="Fashion"
                  {...register("category", {
                    required: "The category field is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.category && errors.category.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.brand ? true : false}>
                <FormLabel htmlFor="brand">Brand</FormLabel>
                <Input
                  id="brand"
                  placeholder="No Brand"
                  {...register("brand")}
                />
                <FormErrorMessage>
                  {errors.brand && errors.brand.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.type ? true : false}>
                <FormLabel htmlFor="type">Type</FormLabel>
                <Input
                  id="type"
                  placeholder="Woman Dress"
                  {...register("type")}
                />
                <FormErrorMessage>
                  {errors.type && errors.type.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description ? true : false}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  placeholder=""
                  {...register("description")}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                variant="solid"
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
