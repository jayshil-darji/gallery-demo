import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable () 
export class CommonService {
    
    public event: any = {};

    public eventObservable = new BehaviorSubject('');
    
    constructor() {
    }

    public setEvent(event: string, data: any) {
        this.event = {'event': event, 'data': data};
        this.eventObservable.next(this.event);
    }
}