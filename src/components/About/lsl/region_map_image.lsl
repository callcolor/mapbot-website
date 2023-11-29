string API = "https://www.bonniebots.com/static-api/regions/";

default
{
    state_entry()
    {
        // Stores the region name then makes a request to the BonnieBots region API.
        string region = llGetRegionName();
        llHTTPRequest(API + region + ".json", [HTTP_METHOD, "GET", HTTP_MIMETYPE, "application/json"], "");
    }

    http_response(key request, integer s, list h, string m)
    {
        // Assigns the map texture to the entire linkset on all sides based on the region_map_image json value.
        llSetLinkPrimitiveParamsFast(
          LINK_SET, 
          [PRIM_TEXTURE, ALL_SIDES, llJsonGetValue(m, ["region_map_image"]), 
          <1,1,0>, 
          ZERO_VECTOR, 
          0
        ]);
    }
}