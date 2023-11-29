import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const questions = [
  {
    question: `What data is being collected?`,
    answer: `In addition to the data displayed on the BonnieBots website, we have begun collecting historic land auction data, estate names, group and group membership data, and land ownership information. This is to support possible future features such as land purchase price history, active groups and group search, and a summary of the largest land owners. Any newly collected data will be available on the website as soon as we can do so safely.`,
  },
  {
    question: `Do you plan to monetize the data?`,
    answer: `We are firmly opposed to any of the data collected being used for monetary gains. The purpose of releasing this information is to share access with everyone.`,
  },
  {
    question: `How secure is the data?`,
    answer: `No data is ever 100% secure. We have taken all reasonable steps to secure the data and limit access. Access to the full database content is severely limited and will never be shared in full outside of the BonnieBots team.`,
  },
  {
    question: `How do I prevent BonnieBots from visiting my region?`,
    answer: `We recommend utilizing the land access tools within region and parcel controls.`,
  },
  {
    question: `How often do BonnieBots visit regions?`,
    answer: `The intent is to visit every region on the grid within 24 hours. Some days this may result in multiple visits, depending on how quickly the Bonnies are moving that day.`,
  },
  {
    question: `How accurate is the Marketplace information?`,
    answer: `Due to limitations we are unable to guarantee the accuracy of the Marketplace information. Our best estimate is that we are under-reporting by 25-35%.  It may be interesting to note that transactions below L$249 do not appear on the "What Customers are Buying Now" section of the Marketplace homepage.`,
  },
  {
    question: `Do you collect Personal Identifying Information such as IP addresses, credit cards, etc?`,
    answer: `No. 100% no. Not only is this information that can not be gathered from BonnieBots but we have no interest in information that isn't directly related to in-world content.`,
  },
  {
    question: `Are you interested in working with my organization to create new features?`,
    answer: `We would be happy to talk with you! Please keep in mind we do not share any unfiltered data and are not interested in any projects which can be used to identify individuals.`,
  },
  {
    question: `How much does this cost you?`,
    answer: `Very, very little. The largest cost has been the domain name registration fee.`,
  },
  {
    question: `Do other people have databases like this?`,
    answer: `Yes. Specifically, some merchants have approached us to compare their data with ours. We have accepted sales data and customer lists from marketplace sellers and provided a percentage match figure to our data set. We have never shared any data in exchange beyond the aggregate match percentage. All data we share is available to everyone through the BonnieBots.com website.`,
  },
  {
    question: `Are you stalking me?`,
    answer: `No. Who are you again?`,
  },
];

const Faq = () => {
  return (
    <>
      <h3>FAQ</h3>
      {questions.map((q, i) => (
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{
              background: '#1976d2',
              color: 'white',
            }}
          >
            <Typography>{q.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{q.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default Faq;
