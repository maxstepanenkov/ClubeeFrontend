import Link from 'next/link';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const StyldedTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'left',
    backgroundColor: 'transparent'
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

const MainLayout = ({ children }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, val) => {
    setValue(val);
  }
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ bgcolor: '#2e1534' }}>
          <StyldedTabs
            value={value}
            onChange={handleChange}
          >
            <Link href="/">
              <StyledTab label="Articles list" />
            </Link>
            <Link href="/create">
              <StyledTab label="Create article" />
            </Link>
          </StyldedTabs>
        </Box>
      </Box>
      <div>
        {children}
      </div>
    </>
  )
}

export default MainLayout;