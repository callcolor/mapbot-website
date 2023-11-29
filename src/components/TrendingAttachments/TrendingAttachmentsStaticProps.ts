import contextPromise from '../../../utils/contextPromise';

interface TrendingAttachment {
  attachment_name: string;
  current_week_count: bigint;
  previous_week_count: bigint;
  delta: bigint;
  deltapct: bigint;
}

const AttachmentListStaticProps = async () => {
  const { prisma } = await contextPromise;
  const attachments = await prisma.$queryRaw<TrendingAttachment[]>`
    select
      q1.attachment_name,
      cnt1 as current_week_count,
      coalesce(cnt2, 0) as previous_week_count,
      cnt1 - coalesce(cnt2, 0) as delta,
      (cnt1 - coalesce(cnt2, 0)) * 100 / coalesce(cnt2, 1) as deltapct
    from (
      select 
        attachment_name, 
        count(*) as cnt1
      from avatar_attachment 
      where avatar_attachment_scan_date >= (NOW() - INTERVAL '7 DAY')::DATE 
        and avatar_attachment_scan_date <= (NOW() - INTERVAL '1 DAY')::DATE 
      group by attachment_name 
    ) q1
    left join (
      select 
        attachment_name, 
        count(*) as cnt2
      from avatar_attachment 
      where avatar_attachment_scan_date >= (NOW() - INTERVAL '14 DAY')::DATE 
        and avatar_attachment_scan_date <= (NOW() - INTERVAL '8 DAY')::DATE
      group by attachment_name 
    ) q2 on q1.attachment_name = q2.attachment_name 
    where 1=1
      and cnt1 > 20
      and cnt1 > coalesce(cnt2, 0)
    order by (cnt1 - coalesce(cnt2, 0)) * 100 / coalesce(cnt2, 1) desc
    limit 10000
  `;

  const data = attachments.map((attachment) => {
    return [
      attachment.attachment_name,
      Number(attachment.current_week_count),
      Number(attachment.previous_week_count),
      Number(attachment.delta),
      Number(attachment.deltapct),
    ];
  });

  return {
    trendingAttachmentsStaticProps: {
      data,
    },
  };
};

export default AttachmentListStaticProps;
