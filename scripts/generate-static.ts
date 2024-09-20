// import birthdays from './birthdays';
import historicTopAttachments from './historic-top-attachments';
import regions from './regions';
import stats from './stats';

const main = async () => {
  console.log(`Generating static API.`);

  await regions();

  await historicTopAttachments();

  await stats();

  console.log(`Generating static API done!`);
};

main();
