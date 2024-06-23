function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
var consonants;
var extras;
var vowels;
//usage:
function objectFlip(obj) {
    const ret = {};
    Object.keys(obj).forEach(key => {
      ret[obj[key]] = key;
    });
    return ret;
  }
function do_it() {
    readTextFile("transliteratorKeys.json", function(text){
        var data = JSON.parse(text);
        consonants = data.consonants
        
        pos = Number(document.getElementById("sel").value)
        for (const [key, value] of Object.entries(consonants)) {
            consonants[key] = consonants[key][pos] || consonants[key][0] || ""
            consonants[key] = consonants[key].replaceAll(" ", "")
        }
        consonants = objectFlip(consonants)
        extras = data.extras
        for (const [key, value] of Object.entries(extras)) {
            extras[key] = extras[key][pos] || extras[key][0] || ""
            extras[key] = extras[key].replaceAll(" ", "") 
        }
        extras = objectFlip(extras)
        vowels = data.vowels
        for (const [key, value] of Object.entries(vowels)) {
            vowels[key] = vowels[key][pos] || vowels[key][0] || ""
            vowels[key] = vowels[key].replaceAll(" ", "")
        }
        vowels = objectFlip(vowels)
        
        /*for (var i in vowels) {
            vowels[i] = vowels[i][pos]
            vowels = objectFlip(vowels)
            console.log(vowels)
        }*/
        val = transliterate(document.getElementById("left").value, consonants, extras, vowels)
        
        document.getElementById("right").value = val
        //console.log(data);
    });
}


function transliterate(input, consonants, extras, vowels) {
    input = input.replaceAll("ॐ", "ओ३म्");
    
    for (const key in extras) {
        input = input.replaceAll(key, extras[key]);
    }
    console.log(consonants, extras, vowels)

    let output = "";
    const c = ["k", "g", "ṅ", "c", "j", "ñ", "ṭ", "ḍ", "ṇ", "t", "d", "n", "p", "b", "m", "y", "r", "l", "ḻ", "s", "ṣ", "h"];
    
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        output += consonants[char] || vowels[char] || char;
    }
    
    output = output.replaceAll("a्", "").replaceAll("a3", "āā").replaceAll("i3", "īī")
                   .replaceAll("u3", "ūū").replaceAll("ṛ3", "ṝṝ").replaceAll("ḷ3", "ḹḹ")
                   .replaceAll("ē3", "ēē").replaceAll("ai4", "āi").replaceAll("ō3", "ōō")
                   .replaceAll("au4", "āu").replaceAll("a્", "");
    
    const keys = Object.keys(vowels);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = vowels[key];
        output = output.replaceAll("a" + value, value.replaceAll("⠀", ""));
    }
    
    output = output.replaceAll("aĩ", "a͠i").replaceAll("aũ", "a͠u");
    
    for (let i = 0; i < c.length; i++) {
        const consonant = c[i];
        output = output.replaceAll(consonant + "v", consonant + "w");
    }
    
    output = output.replaceAll("jñ", "gy");
    
    return output;
}
/*
function transliterate(input, consonants, extras, vowels) {
    input = input.replaceAll("ॐ", "ओ३म्")
    for (var i in extras) {
        input = input.replaceAll(i, extras[i])
    }
    
    output = ""
    cco = ["k", "g", "ṅ", "c", "j", "ñ", "ṭ", "ḍ", "ṇ", "t", "d", "n", "p", "b", "m", "y", "r", "l", "ḻ", "s",
        "ṣ", "h"]
    for (var i in input) {
        output += i in consonants ? consonants[i] : i in vowels ? vowels[i] : i
        console.log(consonants[i])
    }
    
    const keys = Object.keys(vowels);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = vowels[key]
        output = output.replaceAll("a" + value, value)
    }
    output = output.replaceAll("aĩ", "a͠i").replaceAll("aũ", "a͠u")
    for (var i in cco) {
        output = output.replaceAll(`${i}v`, `${i}w`)
    }
    output = output.replaceAll("jñ", "gy")
    return output
}
*/

/**
 * def transliterate(input: str) -> str:
    input = input.replace("ॐ", "ओ३म्")
    #input = input.replace("श़", "zha")
    for i in extras:
        input = input.replace(i, extras[i])
    input = input.replace("ज़", "ज़").replace(
        "ख़", "ख़").replace("क़", "क़").replace(
        "फ़", "फ़").replace("ऴ", "ऴ").replace(
        "ऩ", "ऩ").replace("ऱ", "ऱ").replace(
        "य़", "य़").replace("ग़", "ग़")
    output = ""
    consonants = ["k", "g", "ṅ", "c", "j", "ñ", "ṭ", "ḍ", "ṇ", "t", "d", "n", "p", "b", "m", "y", "r", "l", "ḻ", "s",
                  "ṣ", "h"]
    for i in input:
        output += transliterator_key_consonants[i] if i in transliterator_key_consonants else transliterator_key_vowels[
            i] if i in transliterator_key_vowels else i
    output = output.replace("a्", "").replace("a3", "āā").replace("i3", "īī").replace("u3", "ūū").replace("ṛ3",
                                                                                                          "ṝṝ").replace(
        "ḷ3", "ḹḹ").replace("ē3", "ēē").replace("ai4", "āi").replace("ō3", "ōō").replace("au4", "āu")
    for i in range(len(transliterator_key_vowels)):
        output = output.replace("a" + transliterator_key_vowels[list(transliterator_key_vowels.keys())[i]],
                                transliterator_key_vowels[list(transliterator_key_vowels.keys())[i]].replace("⠀", ""))
    output = output.replace("aĩ", "a͠i").replace("aũ", "a͠u")
    for i in consonants:
        output = output.replace(f"{i}v", f"{i}w")
    output = output.replace("jñ", "gy")
    return output
 */