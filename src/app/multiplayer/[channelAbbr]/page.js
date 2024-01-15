"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getRequest } from '../../../../util/requestHelper.js'
import { ChakraProvider } from '@chakra-ui/react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function Home() {

    const sRouteSegments = usePathname().split('/');
    const sCategoryAbbr = sRouteSegments[sRouteSegments.length - 1]

    const [aChannelNames, setChannelNames] = useState(null);
    const [bChannelsLoadingError, setChannelsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getRequest(`/category/${sCategoryAbbr}/liveChannels`);
                setChannelNames(result);
            } catch (error) {
                setChannelsError(true);
            }
        };
        fetchData();
    }, [sCategoryAbbr]);

    return (
        <ChakraProvider>
            <div>
                <Link href="../">
                    <button>Go to back to Home</button>
                </Link>
                {bChannelsLoadingError && (
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Request failed!</AlertTitle>
                        <AlertDescription>Could not retrieve live channels for category: {sCategoryAbbr}.</AlertDescription>
                    </Alert>
                )}
                {aChannelNames && (
                    <div className="grid grid-cols-4 gap-0">
                        {aChannelNames.map((item, index) => (
                            // <iframe className="w-full h-full gap-0" key={index} src={`https://player.twitch.tv/?channel=${item}&parent=localhost`} frameborder="0" allowFullScreen="true" scrolling="no" height="378" width="620"></iframe>
                            <a key="1" href="http://example.com">{sCategoryAbbr}</a>
                        ))}
                    </div>
                )}
                {/* TODO: add select option list with all Twitch categories -> scrape categories and its URLs */}

            </div>
        </ChakraProvider>
    )
}
