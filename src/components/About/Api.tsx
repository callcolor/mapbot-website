import SyntaxHighlighter from 'react-syntax-highlighter';
import { github as style } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Img from '../../../utils/Img';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import random_region from './lsl/random_region.lsl';
import region_map_image from './lsl/region_map_image.lsl';
import text_to_speech from './lsl/text_to_speech.lsl';
import text_to_texture from './lsl/text_to_texture.lsl';
import chat_completion from './lsl/chat_completion.lsl';

const Code = (props: any) => {
  return (
    <pre
      style={{
        display: 'block',
        overflowX: 'auto',
        padding: '0.5em',
        color: 'rgb(0, 0, 0)',
        background: 'rgb(248, 248, 248)',
      }}
    >
      <code>{props.children}</code>
    </pre>
  );
};

const Expand = ({ header, children }: { header: string; children: any }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{
          background: '#1976d2',
          color: 'white',
        }}
      >
        <Typography>{header}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

const Api = () => {
  return (
    <>
      <h3>API</h3>
      <Expand header="Region Info">
        <p>GET: /static-api/regions/[region_name].json</p>
        <Code>
          <a target="_blank" href="/static-api/regions/Bonnie Bay.json">
            /static-api/regions/Bonnie Bay.json
          </a>
        </Code>
        <p>GET: /static-api/regions/[region_x]/[region_y]/index.json</p>
        <Code>
          <a target="_blank" href="/static-api/regions/1003/1345/index.json">
            /static-api/regions/1003/1345/index.json
          </a>
        </Code>
        <div>
          Response:
          <SyntaxHighlighter language="json" style={style}>
            {`
{
  "region_name": "Bonnie Bay",
  "region_map_image": "3a60ad94-9d62-35c7-091a-09cd216dd6b8",
  "region_x": 1003,
  "region_y": 1345,
  "region_owner": "cd97e3f8-9f75-40b4-ad5d-b9868d7595c5",
  "region_product_sku": "229",
  "region_product_name": "Estate / Homestead",
  "estate_id": 60025,
  "hard_max_agents": 25,
  "hard_max_objects": 5000,
  "deny_age_unverified": false,
  "region_access": 42,
  "deleted_at": null,
  "estate_name": "Bonnie Bay",
  "region_ip": "54.191.219.124",
  "region_port": 13043,
  "channel_version": "Second Life Server 2023-06-09.580543",
  "region_updated_at": "2023-07-10T22:04:00.833Z",
  "access_name": "Adult"
}
`.trim()}
          </SyntaxHighlighter>
        </div>
        <div>
          LSL example:
          <SyntaxHighlighter language="lsl" style={style}>
            {region_map_image}
          </SyntaxHighlighter>
        </div>
      </Expand>

      <Expand header="Parcel Info">
        <p>GET: /static-api/regions/[region_name]/parcels.json</p>
        <Code>
          <a target="_blank" href="/static-api/regions/Bonnie Bay/parcels.json">
            /static-api/regions/Bonnie Bay/parcels.json
          </a>
        </Code>
        <p>GET: /static-api/regions/[region_x]/[region_y]/index.json</p>
        <Code>
          <a target="_blank" href="/static-api/regions/1003/1345/parcels.json">
            /static-api/regions/1003/1345/parcels.json
          </a>
        </Code>
        <div>
          Response:
          <SyntaxHighlighter language="json" style={style}>
            {`
[
  {
    "parcel_id": "c75e5e16-0628-de04-d641-51a98945b617",
    "parcel_area": 9216,
    "parcel_deleted": null,
    "parcel_description": "Cute things will be covered in syrup and devoured. You have been warned.",
    "parcel_name": "Pancake Isle",
    "parcel_status": 0,
    "parcel_updated_at": "2023-07-10T22:03:57.503Z"
  },
  {
    "parcel_id": "c7d50eba-d0ae-a8e1-0094-0017c9ff9479",
    "parcel_area": 56320,
    "parcel_deleted": null,
    "parcel_description": "Discover how bots are evil and definitely stalk you.",
    "parcel_name": "BonnieBots HQ",
    "parcel_status": 0,
    "parcel_updated_at": "2023-07-10T22:03:57.503Z"
  }
]
`.trim()}
          </SyntaxHighlighter>
        </div>
      </Expand>

      <Expand header="Popular Regions">
        <p>GET: /static-api/regions/popular/[i[1-100]].json</p>
        <Code>
          <a target="_blank" href="/static-api/regions/popular/1.json">
            /static-api/regions/popular/1.json
          </a>
        </Code>
        <Code>
          <a target="_blank" href="/static-api/regions/popular/100.json">
            /static-api/regions/popular/100.json
          </a>
        </Code>
        <div>A list of the 100 most popular regions updated hourly.</div>
        <div>
          LSL example:
          <SyntaxHighlighter language="lsl" style={style}>
            {random_region}
          </SyntaxHighlighter>
        </div>
      </Expand>

      <Expand header="Region Terrain Sculpt Maps">
        <p>GET: /static-api/terrain/[region_name].png</p>
        <Code>
          <a target="_blank" href="/static-api/terrain/North Forepaw.png">
            /static-api/terrain/North Forepaw.png
          </a>
        </Code>
        <div>
          Example:
          <Code>
            <a
              target="_blank"
              href="https://www.bonniebots.com/static-api/terrain/North%20Forepaw.png"
              rel="noreferrer"
            >
              <Img
                style={{ display: 'block', padding: '10px', background: 'black' }}
                src="https://www.bonniebots.com/static-api/terrain/North%20Forepaw.png"
              />
            </a>
          </Code>
        </div>
      </Expand>

      <Expand header="Top Attachment Reports">
        <p>GET: /static-api/top-attachments/[year]/[month]/[day].csv</p>
        <Code>
          <a
            target="_blank"
            href="https://www.bonniebots.com/static-api/top-attachments/2023/02/09.csv"
            rel="noreferrer"
          >
            /static-api/top-attachments/2023/02/09.csv
          </a>
        </Code>
      </Expand>

      <Expand header="Realtime Data">
        <div>
          Connection example:
          <SyntaxHighlighter language="javascript" style={style}>
            {`
import { io } from "socket.io-client";

const socket = io("https://realtime.bonniebots.com:3443");

socket.on('message', (data: any) => {
    console.log(data);
});
`.trim()}
          </SyntaxHighlighter>
        </div>
        <div>
          REGION_DATA message:
          <SyntaxHighlighter language="javascript" style={style}>
            {`
{
    "region_name": "Rainbow",
    "region_map_image": "428464f7-a3d8-f50e-6a68-f388b4f1df55",
    "region_x": 1004,
    "region_y": 1021,
    "scan_id": 5815,
    "region_created_at": "2022-06-26T16:40:22.096Z",
    "region_updated_at": "2023-01-29T03:32:13.483Z",
    "region_visited_at": "2023-01-28T22:31:38.853Z",
    "region_owner": "00000000-0000-0000-0000-000000000000",
    "region_cpu": 947,
    "region_cpu_ratio": 1,
    "region_colo_name": "aws-us-west-2a",
    "region_product_sku": "129",
    "region_product_name": "Mainland / Homestead",
    "estate_id": 1,
    "hard_max_agents": 25,
    "hard_max_objects": 5000,
    "deny_age_unverified": false,
    "region_visited_by": "bonniebelle90",
    "region_banned_at": null,
    "region_access": 21,
    "deleted_at": null,
    "region_banned_reason": null,
    "region_visited_height": 4000,
    "region_visited_nearby_objects": 0,
    "region_requested_drop_zone": null,
    "estate_name": "mainland",
    "covenant_uuid": "00000000-0000-0000-0000-000000000000",
    "avatarCount": 1,
    "messageType": "REGION_DATA"
}
`.trim()}
          </SyntaxHighlighter>
        </div>
      </Expand>

      <Expand header="Text-to-Speech Service">
        <div>Creates and uploads an audio clip of the requested text being read.</div>
        <div>
          For a list of available voices see{' '}
          <a
            target="_blank"
            href="https://mycroftai.github.io/mimic3-voices/#en_US"
            rel="noreferrer"
          >
            https://mycroftai.github.io/mimic3-voices/#en_US
          </a>
          .
        </div>
        <div>
          LSL example:
          <SyntaxHighlighter language="lsl" style={style}>
            {text_to_speech}
          </SyntaxHighlighter>
        </div>
      </Expand>

      <Expand header="Text-to-Texture Service">
        <div>Creates and uploads a texture containing the text requested.</div>
        <div>
          LSL example:
          <SyntaxHighlighter language="lsl" style={style}>
            {text_to_texture}
          </SyntaxHighlighter>
        </div>
      </Expand>

      {/* <Expand header="AI Chat Completion Service">
        <div>Performs chat completion via a large language model.</div>
        <div>
          LSL example:
          <SyntaxHighlighter language="lsl" style={style}>
            {chat_completion}
          </SyntaxHighlighter>
        </div>
      </Expand> */}
    </>
  );
};

export default Api;
