export class Sender {
    constructor (iframe) {
        this.iframe = iframe;
        this.domain = window.location.href;
        window.addEventListener("message", this.listener.bind(this));
    }
    _postMessage(message) {
        this.iframe.postMessage(message, this.domain);
    }
    addData(data) {
        if (data) {
            let message = JSON.stringify({'add' : data});
            this._postMessage(message);					
        }	
    }
    readData(key) {
        if (key) {
            let message = JSON.stringify({'read' : key});					
            this._postMessage(message); 
        }
    }
    deleteData(key) {
        if (key) {
            let message = JSON.stringify({'delete' : key});					
            this._postMessage(message); 
        }
    }
    listener(e) {				          	
        if (e.data){
            let p = document.createElement('p');
            p.innerText = JSON.parse(e.data);
            document.body.appendChild(p);	
        }                
    }
}		