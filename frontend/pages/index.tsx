import { Breadcrumb } from "@/components/Breadcrumb";
import Header from "@/components/Header";
import { BREADCRUMB_DATA } from "@/data/breadcrumb.data";
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";

export default function Home() {
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
          <Flex flexDir="column" gap={5} pt={5} w="calc(100vw - 50%)">
            <Flex flexDir="column" gap={2}>
              <Heading size="2xl" color={useColorModeValue("white", "white")}>
                Products
              </Heading>
              <Breadcrumb data={BREADCRUMB_DATA} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
