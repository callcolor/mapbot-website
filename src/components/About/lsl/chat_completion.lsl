// Requests a chat completion from Bonnie.
key bonnieBelle86 = "5a6b0045-12db-4bf6-8108-7c27f024ca5b";
string URL = "";
string REQUEST = "";

requestChatCompletion(string content) {
    if (REQUEST != "") return;
    REQUEST = llList2Json(JSON_OBJECT, [
        "messages", llList2Json(JSON_ARRAY, [
             llList2Json(JSON_OBJECT, [
                "role", "system",
                "content", "You are Bonnie, a helpful Second Life bot."
             ]),
             llList2Json(JSON_OBJECT, [
                "role", "user",
                "content", content
             ])
        ]),
        "temperature", 1.0,
        "max_tokens", 300
    ]);
    
    string message = llList2Json(JSON_OBJECT, [
        "command", "chat-completions",
        "url", URL
    ]);
    
    llInstantMessage(bonnieBelle86, message);
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
        requestChatCompletion(m);
    }
    
    http_request(key id, string method, string body) {
        if (method == URL_REQUEST_GRANTED) {
            URL = body;
        } else {
            string command = llJsonGetValue(body, ["command"]);
            if (command == "request") {
                llHTTPResponse(id, 200, REQUEST);
            } else if (command == "response") {
                llHTTPResponse(id, 200, "OK");
                string content = llJsonGetValue(body, ["content"]);
                llSay(0, content);
                REQUEST = "";
            }
        }
    }
    
    timer() {
        llResetScript();
    }
}
