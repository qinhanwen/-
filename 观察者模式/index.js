class EventEmitter {

    constructor(){
        this.handlers = {}
    }
    on(type,handler){
        if(this.handlers[type]){
            this.handlers[type].push(handler);
        }else{
            this.handlers[type] = [];
            this.handlers[type].push(handler);
        }
    }

}