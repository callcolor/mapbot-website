// Request a text-to-speech sound clip from Bonnie then play it.
key bonnieBelle86 = "5a6b0045-12db-4bf6-8108-7c27f024ca5b";
string URL = "";

requestTTS(string text) {
    // Truncate text so we don't overflow the llInstantMessage limit.
    text = llBase64ToString(llGetSubString(llStringToBase64(text), 0, 512));

    string message = llList2Json(JSON_OBJECT, [
        "command", "tts",
        "voice", "en_US/hifi-tts_low#92",
        // "voice", "en_US/cmu-arctic_low#ljm",
        // "voice", "de_DE/thorsten-emotion_low#drunk",

        // scale: larger numbers are slower, smaller numbers are faster
        "scale", 1,
        
        // pitch: larger numbers are higher, smaller numbers are deeper
        "pitch", 0,
        
        "body", text,
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
        requestTTS(m);
    }
    
    http_request(key id, string method, string body) {
        if (method == URL_REQUEST_GRANTED) {
            URL = body;
        } else {
            llHTTPResponse(id, 200, "OK");
            string sound = llJsonGetValue(body, ["uuid"]);
            float duration = (float)llJsonGetValue(body, ["duration"]);
            llTriggerSound(sound, 1.0);
            llSleep(duration);
        }
    }
    
    timer() {
        llResetScript();
    }
}
