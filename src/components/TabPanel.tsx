const TabPanel = ({ children, tab, i, style }: any) => {
  return <div style={{ display: tab === i ? 'block' : 'none', ...style }}>{children}</div>;
};

export default TabPanel;
