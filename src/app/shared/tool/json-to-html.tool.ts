export function JsonToHtml(data) {
    // If input json, change to string.
    let str = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Match certain type that need to be colored.
    str = str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });

    // Match and change line.
    let indent = 0;                                   // Indentation number
    const line = '</br>';                             // string to change line
    const indentChar = '&nbsp;&nbsp;&nbsp;&nbsp;';    // Indentation value
    const inArray = false;                            // if in an array

    // Match element that need to change line.
    str = str.replace(/((,(\t)*[^\{])|(,(\t)*\{)|(\[(\t)*\{)|(\}(\t)*\])|\}|\{|\[|\])/g, match => {
        let str = '';
        let tab = '';
        // If '{' or ',{', change line and plus indentation.
        if (match === '{' || match === '[' || /,(\t)*\{/.test(match) || /\[(\t)*\{/.test(match)) {
            indent++;
            // If '}', change line and minus indentation.
        } else if (match === '}' || match === ']' || /\}(\t)*\]/.test(match)) {
            indent--;
        }
        // Change indentation into string.
        for (let i = 0; i < indent; i++) {
            tab += indentChar;
        }
        // If '}', change line and indentation.
        if (match === '}' || match === ']' || /\}\]/.test(match)) {
            str = line + tab + match;
            // If ',' without '{' behind, change line and indentation. 若为,后不跟{，则在,后进行换行缩进
        } else if (/,(\t)*[^\{]/.test(match)) {
            str = ',' + line + tab + match.substring(1);
            // Otherwise change line and indentation at the end.
        } else {
            str = match + line + tab;
        }
        return str;
    });
    return ('<div class="json">' + str + '</div>');
}
