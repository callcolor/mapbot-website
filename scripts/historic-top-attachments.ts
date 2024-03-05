import { topAttachmentsQuery } from '../src/components/TopAttachments/TopAttachmentsStaticProps';
import contextPromise from '../utils/contextPromise';
import { fileExists, writeFile } from '../utils/fs';
import { unparse } from 'papaparse';

const historicTopAttachments = async () => {
  const { prisma } = await contextPromise;

  console.log(`historic top-attachments.`);

  // loop over last 14 days.
  // if file does not exist, create it.
  const dateYMDs = await prisma.$queryRaw<{ ymd: string }[]>`
    select avatar_attachment_scan_date::date::text as ymd 
    from avatar_attachment 
    group by avatar_attachment_scan_date 
    order by avatar_attachment_scan_date desc 
    limit 14
    offset 1
    ;
  `;

  for (const dateYMD of dateYMDs) {
    const dateYMDString = dateYMD.ymd;
    const year = dateYMDString.split('-')[0];
    const month = dateYMDString.split('-')[1];
    const day = dateYMDString.split('-')[2];

    const filepath = `top-attachments/${year}/${month}/${day}.csv`;

    if (!fileExists(filepath)) {
      const attachments = await topAttachmentsQuery(dateYMDString);
      const csv = unparse(attachments);
      await writeFile(filepath, csv);
    }
  }

  console.log(`delete old attachment data.`);
  await prisma.$queryRaw`
    delete from public.avatar_attachment
    where avatar_attachment_scan_date < (NOW() - INTERVAL '1 YEAR')::DATE 
    ;
  `;
};

export default historicTopAttachments;
