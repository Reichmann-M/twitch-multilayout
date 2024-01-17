"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getRequest } from '../../../../util/requestHelper.js'
import { ChakraProvider, Divider } from '@chakra-ui/react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    Heading,
    Stack,
    Spinner
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { GoMute } from "react-icons/go";
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function Multiplayer() {

    const sRouteSegments = usePathname().split('/');
    const sCategoryAbbr = sRouteSegments[sRouteSegments.length - 1]

    const [aChannelNames, setChannelNames] = useState(null);
    const [bChannelsLoadingError, setChannelsError] = useState(false);

    const [bAllStreamsMuted, setBAllStreamsMuted] = useState(false);

    const [spinnerVisible, setSpinnerVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getRequest(`/category/${sCategoryAbbr}/liveChannels`);
                setChannelNames(result.slice(0, 16));
            } catch (error) {
                setChannelsError(true);
            }
            setSpinnerVisible(false)
        };
        fetchData();
    }, [sCategoryAbbr]);

    const muteAllStreams = () => {
        console.log('test')
        setBAllStreamsMuted(true);
    }

    return (
        <ChakraProvider>
            <div>
                <Stack direction='row' spacing={4}>
                    <Link href="../">
                        <Button leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='solid'>
                            Home
                        </Button>
                    </Link>
                    <Heading as='h2' size='xl'>{`Twitch Multiplayer - ${sCategoryAbbr}`}</Heading>
                </Stack>
                {spinnerVisible && (<Spinner color='red.500' />)}
                {bChannelsLoadingError && (
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Request failed!</AlertTitle>
                        <AlertDescription>Could not retrieve live channels for category: {sCategoryAbbr}.</AlertDescription>
                    </Alert>
                )}
                {aChannelNames && aChannelNames.length===0 && (
                    <Alert status='warning'>
                    <AlertIcon />
                    <AlertTitle>Nobody livestreaming!</AlertTitle>
                    <AlertDescription>There are currently no live channels for: {sCategoryAbbr}.</AlertDescription>
                </Alert>
                )}
                {aChannelNames && aChannelNames.length>0 && (
                    <div className="grid grid-cols-4 gap-0">
                        {
                        aChannelNames.map((item, index) => (
                            <iframe id={`iframe${index}`} className="w-full h-full gap-0" key={index} src={`https://player.twitch.tv/?channel=${item}&parent=localhost`} frameborder="0" allowFullScreen="true" scrolling="no" height="378" width="620" allow="autoplay" muted={bAllStreamsMuted}></iframe>
                        ))}
                        <Button onClick={() => muteAllStreams()} leftIcon={<Icon as={GoMute} />} colorScheme='teal' variant='solid'>
                            Mute All
                        </Button>
                    </div>
                    
                )}
                

            </div>
        </ChakraProvider>
    )
}
