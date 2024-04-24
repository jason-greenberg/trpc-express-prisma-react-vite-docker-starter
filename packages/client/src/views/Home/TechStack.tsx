import {
  Pane,
  Card,
  Heading,
  majorScale,
  Image,
  minorScale
} from 'evergreen-ui'

import viteLogo from 'assets/Vitejs-logo.svg'
import evergreenLogo from 'assets/evergreen-logo.png'
import trpcLogo from 'assets/trpc-logo.svg'
import prismaLogo from 'assets/prisma-logo.png'
import dockerLogo from 'assets/docker-logo.webp'

const logos: { src: string; name: string; site: string }[] = [
  {
    src: evergreenLogo,
    name: 'Evergreen-UI',
    site: 'https://evergreen.segment.com/'
  },
  { src: viteLogo, name: 'Vite + React', site: 'https://vitejs.dev/' },
  { src: trpcLogo, name: 'tRPC', site: 'https://trpc.io/' },
  { src: prismaLogo, name: 'Prisma', site: 'https://www.prisma.io/' },
  { src: dockerLogo, name: 'Docker', site: 'https://www.docker.com/' }
]

export default () => (
  <Pane
    display="flex"
    flexDirection="column"
    alignContent="flex-start"
    gap={majorScale(2)}
  >
    {logos.map(({ src, name, site }) => (
      <Card
        key={name}
        display="flex"
        alignItems="center"
        gap={minorScale(5)}
        width="fit-content"
        paddingX={majorScale(3)}
        paddingY={minorScale(3)}
        hoverElevation={1}
        cursor="pointer"
        onClick={() => window.open(site, '_blank')}
      >
        <Image src={src} height={majorScale(8)} width={majorScale(8)} />
        <Heading
          size={900}
          textTransform="uppercase"
          fontWeight={300}
          letterSpacing={0.4}
          marginBottom={minorScale(-1)}
        >
          {name}
        </Heading>
      </Card>
    ))}
  </Pane>
)
