 export class Receiver {
    constructor(domain) {
        this.domain = domain;
        window.addEventListener("message", this.listener.bind(this)); 
    }                
    listener(e) { 
        console.log(e.origin) 
        if (e.origin !== this.domain) 
            return;                     
        if (e.data) {
            let message = JSON.parse(e.data), 
                state = Object.keys(message)[0], 
                messageBody = message[state],                 
                callback, 
                key, 
                value, 
                check; 
                
            switch (state) {
                case 'add':
                    key = Object.keys(messageBody)[0];
                    value = messageBody[key];
                    localStorage[key] = JSON.stringify(value);                            
                    callback = `written: ${key} : ${value}`; 
                    console.log(callback);
                    e.source.postMessage(JSON.stringify(callback), e.origin);                                  
                    break;

                case 'read':
                    check = localStorage[messageBody];                                                       
                    check ? value = JSON.parse(check) : value = undefined;                            
                    value ?
                        callback = `read: ${messageBody} : ${value}` :                          
                        callback = `record "${messageBody}" not found`;
                    console.log(callback);                         
                    e.source.postMessage(JSON.stringify(callback), e.origin);
                    break;

                case 'delete':  
                    check = localStorage[messageBody];
                    if (check) {
                        localStorage.removeItem(messageBody);
                        callback = `removed: "${messageBody}"`;
                    } else {
                        callback = `record "${messageBody}" not found`;
                    }
                    console.log(callback);
                    e.source.postMessage(JSON.stringify(callback), e.origin);
            }
        }    
    }
}