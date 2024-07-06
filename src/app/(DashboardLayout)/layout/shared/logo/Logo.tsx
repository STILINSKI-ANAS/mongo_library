import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { styled } from '@mui/system';

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
});

const Logo = () => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <LinkStyled href="/">
        <Image src="/images/logos/dark-logo.svg" alt="logo" height={100} width={200} priority />
      </LinkStyled>
    </Box>
  );
};

export default Logo;
