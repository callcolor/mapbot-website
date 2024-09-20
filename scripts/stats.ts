import { getHappenings } from '../src/components/Happening/HappeningStaticProps';
import { RegionAccessFlags } from '../src/types/RegionAccessFlags';
import contextPromise from '../utils/contextPromise';
import { deleteFolder, writeFile } from '../utils/fs';

const stats = async () => {
  const { prisma, scan_id } = await contextPromise;

  console.log(`refresh stats.`);
  const results = await prisma.$queryRaw<{ inworld: number }[]>`
    select sum(mi.avatar_count) as inworld
    from map_info mi 
    where mi.scan_id = ${scan_id};
  `;

  const inworld = results[0].inworld;

  console.log(`save secondlife.xml.`);
  await writeFile(
    `../secondlife.xml`,
    `<stats>
      <status>ONLINE</status>
      <signups>0</signups>
      <inworld>${new Intl.NumberFormat().format(inworld)}</inworld>
</stats>`
  );

  const now = new Date().getTime();

  console.log(`save homepage.xml.`);
  await writeFile(
    `../homepage.xml`,
    `<llsd> 
 	<map> 
 		<key>stats</key> 
 		<map> 
 			<key>signups</key> 
 			<integer>${0}</integer> 
 			<key>signups_updated_unix</key> 
 			<integer>${0}</integer> 
 			<key>signups_updated_slt</key> 
 			<string>${new Date(0).toISOString().split('T')[0]} 00:00:00</string> 
 			<key>inworld</key> 
 			<integer>${inworld}</integer> 
 			<key>inworld_updated_unix</key> 
 			<integer>${Math.round(now / 1000)}</integer> 
 			<key>inworld_updated_slt</key> 
 			<string>${new Date(now).toISOString().split('T')[0]} 00:00:00</string> 
 		</map> 
 	</map> 
 </llsd>`
  );

  console.log(`save homepage.xml.`);
  await writeFile(
    `../homepage.txt`,
    `signups_updated_slt
${new Date(0).toISOString().split('T')[0]} 00:00:00
signups_updated_unix
0
signups
0
exchange_rate_updated_slt
${new Date(0).toISOString().split('T')[0]} 00:00:00
exchange_rate_updated_unix
0
exchange_rate
0
inworld_updated_unix
${Math.round(now / 1000)}
inworld_updated_slt
${new Date(now).toISOString().split('T')[0]} 00:00:00
inworld
${inworld}
`
  );
};

export default stats;
