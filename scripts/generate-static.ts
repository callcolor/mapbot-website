// import birthdays from './birthdays';
import historicTopAttachments from './historic-top-attachments';
import regions from './regions';

const main = async () => {
  console.log(`Generating static API.`);

  await regions();

  await historicTopAttachments();

  console.log(`Generating static API done!`);
};

main();
