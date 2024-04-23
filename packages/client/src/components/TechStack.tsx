import { Pane, Heading, majorScale, Image, minorScale } from 'evergreen-ui'

import viteLogo from 'assets/Vitejs-logo.svg'
import evergreenLogo from 'assets/evergreen-logo.png'
import trpcLogo from 'assets/trpc-logo.svg'
import prismaLogo from 'assets/prisma-logo.png'
import expressLogo from 'assets/express-logo.png'
import dockerLogo from 'assets/docker-logo.webp'

const logos: { src: string; name: string }[] = [
  { src: evergreenLogo, name: 'Evergreen-UI' },
  { src: viteLogo, name: 'Vite + React' },
  { src: trpcLogo, name: 'tRPC' },
  { src: prismaLogo, name: 'Prisma' },
  { src: expressLogo, name: 'Express' },
  { src: dockerLogo, name: 'Docker' }
]

export default () => (
  <>
    {logos.map(({ src, name }) => (
      <Pane
        key={name}
        display="flex"
        alignItems="center"
        gap={minorScale(5)}
        width={majorScale(42)}
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
      </Pane>
    ))}
  </>
)
