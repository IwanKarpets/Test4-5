import {Sender} from './Sender.js'

function initSender(){
        let iframe = document.querySelector(".iframe").contentWindow,	
            sender = new Sender(iframe);
        window.onload = () => {
            sender.addData({'test' : 'test value'});
            sender.addData({'test1' : 'test value1'});
            sender.readData('test');
            sender.readData('test22');
            sender.deleteData('test');
            sender.readData('test');
        }
}

initSender()