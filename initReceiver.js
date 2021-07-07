import {Receiver} from './Receiver.js'
function initReceiver(){
        let domain = window.origin         
        let receiver = new Receiver(domain);
}

initReceiver()