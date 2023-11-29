import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../src/components/TabPanel';
import Link from 'next/link';
import Layout from '../../src/layouts/Layout';

interface Tab {
  href: string;
  label: string;
}

const TabLayout = ({ title, tabs, children }: { title: string; tabs: Tab[]; children: any }) => {
  const value = tabs.findIndex((t) => t.label === title);
  return (
    <Layout title={title}>
      <Tabs variant="scrollable" scrollButtons="auto" value={value}>
        {tabs.map((t, i) => (
          <Link key={i} href={t.href}>
            <Tab label={t.label} />
          </Link>
        ))}
      </Tabs>
      <TabPanel>{children}</TabPanel>
    </Layout>
  );
};

export default TabLayout;
