import {
  Table as ChakraTable,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
  Box,
  Text,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import Pagination from "./pagination";
import { FormValues } from "@/pages";
import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

const Table = ({ ...props }) => {
  const { data, ...rest } = props;

  return (
    <>
      <Box
        w="full"
        maxH={"calc(100vh - 300px)"}
        bgColor={"white"}
        borderRadius={"md"}
        boxShadow={"md"}
        mt={4}
        overflow={"auto"}
      >
        <TableContainer>
          <ChakraTable size="md" variant="striped">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Code</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Brand</Th>
                <Th>Type</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody color={useColorModeValue("gray.800", "white")}>
              {data.data
                ? data.data.map((prod: any, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <Tr>
                          <Td>
                            <Text>{prod.id}</Text>
                          </Td>
                          <Td>
                            <EditProduct {...prod} />
                          </Td>
                          <Td>
                            <Text>{prod.name}</Text>
                          </Td>
                          <Td>
                            <Text>{prod.category}</Text>
                          </Td>
                          <Td>
                            <Text>{prod.brand}</Text>
                          </Td>
                          <Td>
                            <Text>{prod.type}</Text>
                          </Td>
                          <Td>
                            <Text isTruncated noOfLines={3}>
                              {prod.description}
                            </Text>
                          </Td>
                        </Tr>
                      </React.Fragment>
                    );
                  })
                : ""}
            </Tbody>
          </ChakraTable>
        </TableContainer>
      </Box>
      <Pagination data={data} />
    </>
  );
};

const EditProduct = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      code: props.code,
      name: props.name,
      category: props.category,
      brand: props.brand,
      type: props.type,
      description: props.description,
    },
  });

  const onSubmit = (data: FormValues) => {
    axios
      .put(`/api/v1/products/${props.id}`, data)
      .then((res) => {
        toast({
          title: "Product updated",
          description: "The product is now updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        router.reload();
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

  return (
    <>
      <Text
        cursor={"pointer"}
        color={"blue.400"}
        _hover={{
          textDecoration: "underline",
        }}
        onClick={onOpen}
      >
        {props.code}
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
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
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Table;
