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
  Button
} from '@chakra-ui/react'
import Link from 'next/link';

export default function Home() {
  const [aCategories, setCategories] = useState(null);
  const [bCategoriesLoadingError, setCategoriesError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRequest(`/category`);
        setCategories(result.slice(0, 16)); // Extract the first 16 elements
      } catch (error) {
        setCategoriesError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <ChakraProvider>
      <main className="">
        <div>
          <Heading as='h2' size='xl'>Twitch Multiplayer - Home</Heading>
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
        </div>
        {/* TODO: add select option list with all Twitch categories -> scrape categories and its URLs */}
      </main>
    </ChakraProvider>
  )
}
