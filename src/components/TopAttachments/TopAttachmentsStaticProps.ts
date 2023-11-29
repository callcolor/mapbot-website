import contextPromise from '../../../utils/contextPromise';

interface TopAttachment {
  attachment_name: string;
  attachment_count: bigint;
  attachment_point_name: string;
}

export const topAttachmentsQuery = async (dateYMDString: string) => {
  const { prisma } = await contextPromise;

  return await prisma.$queryRaw<TopAttachment[]>`
    select
      attachment_name,
      attachment_count,
      ap.attachment_point_name 
    from (
      select 
        attachment_name, 
        count(*) as attachment_count, 
        mode() WITHIN GROUP (ORDER BY attached_point) as attachment_point
      from avatar_attachment 
      where 1=1 
        and avatar_attachment_scan_date = ${dateYMDString}::date
        and attachment_name != '' 
      group by attachment_name 
      having count(*) > 5 
      order by count(*) desc 
      limit 10000 
    ) q
    left join attachment_points ap on ap.attachment_point = q.attachment_point
  `;
};

const TopAttachmentsStaticProps = async () => {
  const { prisma } = await contextPromise;

  const dateYMD = await prisma.$queryRaw<{ ymd: string }[]>`
    select (max(avatar_attachment_scan_date) - '1 days'::interval)::date::text as ymd
    from avatar_attachment 
  `;
  const dateYMDString = dateYMD[0].ymd;

  const attachments = await topAttachmentsQuery(dateYMDString);

  const data = attachments.map((attachment) => {
    return [
      attachment.attachment_name,
      attachment.attachment_point_name,
      Number(attachment.attachment_count),
    ];
  });

  return {
    topAttachmentsStaticProps: {
      data,
    },
  };
};

export default TopAttachmentsStaticProps;
