"use client"; // This is a client component 👈🏽
import { useEffect, useState } from 'react';
import { getRequest } from '../../util/requestHelper.js'
import { ChakraProvider } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  Stack,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Flex
} from '@chakra-ui/react'
import Link from 'next/link';
import Sidebar from '../components/Sidebar'

export default function Home() {
  const [aCategories, setCategories] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [bCategoriesLoadingError, setCategoriesError] = useState(false);
  const [randomCategory, setRandomCategory] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRequest(`/category`);
        setCategories(result.slice(0, 30)); // Extract the first 16 elements
        setAllCategories(result);
        setRandomCategory(result[Math.floor(Math.random() * result.length)])
      } catch (error) {
        setCategoriesError(true);
      }
    };
    fetchData();
  }, []);

  const randomizeCategoryLink = () => {
    setRandomCategory(allCategories[Math.floor(Math.random() * allCategories.length)]);
  }

  return (
    <ChakraProvider>
      <Flex w="100%">
        {aCategories && (<Sidebar aCategories={allCategories.sort((a, b) => a.name.localeCompare(b.name))} />)}
        {/* <Heading as='h2' size='xl'>Twitch Multiplayer - Home</Heading> */}
        <div className="">
          {bCategoriesLoadingError && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>Request failed!</AlertTitle>
              <AlertDescription>Could not retrieve Twitch categories.</AlertDescription>
            </Alert>
          )}
          {aCategories && (
            <div className="grid grid-cols-4 gap-0">
              <Link onMouseEnter={randomizeCategoryLink} onMouseUp={randomizeCategoryLink} key="randomCategory" href={`/multiplayer/${randomCategory.abbr}`}>
                <Card className="cursor-pointer" maxW='sm'>
                  <CardBody>
                    <Image
                      src="/randomCategoryBoxart.jpg"
                      alt={"Random Category boxart"}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>🎲 Random</Heading>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
              {aCategories.map((item, index) => (
                <Link key={index} href={`/multiplayer/${item.abbr}`}>
                  <Card maxW='sm'>
                    <CardBody>
                      <Image
                        src={item.imgSrc}
                        alt={`${item.name} boxart`}
                        borderRadius='lg'
                      />
                      <Stack mt='6' spacing='3'>
                        <Heading size='md'>{item.name}</Heading>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Flex>
    </ChakraProvider>
  )
}
