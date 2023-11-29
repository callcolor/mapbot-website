// Select a random region from the 100 most popular regions.

integer random() {
  return (integer)(llFrand(100) + 1);
}

getRandomLocation() {
  llHTTPRequest("https://www.bonniebots.com/static-api/regions/popular/" + (string)random() + ".json", [], "");
}

default {
  state_entry() {
  }

  touch_start(integer total_number) {
      getRandomLocation();
  }
  
  http_response(key i, integer s, list m, string b) {
      string region_name = llJsonGetValue(b, ["region_name"]);
      string access_name = llJsonGetValue(b, ["access_name"]);
      llOwnerSay("https://maps.secondlife.com/secondlife/" + llEscapeURL(region_name) + "/128/128/30 " + access_name);
  }
}
