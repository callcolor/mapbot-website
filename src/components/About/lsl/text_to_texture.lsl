// Requests a texture from Bonnie and displays it on a prim.
key bonnieBelle = "5a6b0045-12db-4bf6-8108-7c27f024ca5b";
string URL = "";

request(string text) {
    // Truncate text so we don't overflow the llInstantMessage limit.
    text = llBase64ToString(llGetSubString(llStringToBase64(text), 0, 512));

    string message = llList2Json(JSON_OBJECT, [
        "command", "text-to-texture",
        "key", "optional request/response id",
        "body", text,
        "bgColor", "#00000088",
        "textColor", "#FFFFFF",
        "fontWeight", 400,
        "lineHeight", 40,
        "margin", 10,
        "customHeight", 1024,
        "maxWidth", 1024,
        "fontSize", 36,
        "textAlign", "center",
        // "textAlign", "left",
        "verticalAlign", "center",
        // "verticalAlign", "top",
        "url", URL
    ]);

    llInstantMessage(bonnieBelle, message);
}

set(string uuid) {
    llSetTexture(uuid, 0);
}

default {
    on_rez(integer n) {
        llResetScript();
    }
    
    state_entry() {
        llRequestURL();
        llListen(0, "", "", "");
        llSetTimerEvent(3600);
    }
    
    listen(integer c, string n, key i, string m) {
        llSetTimerEvent(60);
        request(m);
    }
    
    http_request(key id, string method, string body) {
        if (method == URL_REQUEST_GRANTED) {
            URL = body;
        } else {
            llHTTPResponse(id, 200, "OK");
            llSetTimerEvent(0);
            llSetTimerEvent(3600);
            string requestId = llJsonGetValue(body, ["key"]);
            string uuid = llJsonGetValue(body, ["uuid"]);
            set(uuid);
        }
    }

    changed(integer change) { 
        if (change & CHANGED_TELEPORT) {
            llResetScript();
        }
        if (change & CHANGED_REGION) 
        {
            llResetScript();
        }
        if (change & CHANGED_OWNER)
        {
            llResetScript();
        }
    }
    
    timer() {
        llResetScript();
    }
}
