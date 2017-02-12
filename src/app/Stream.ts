// We wrap rxjs Subject with our own Stream.
// This allows hot-swap, a clearer API, and reduces dependencies on 3rd party
// libraries.

import { Subject } from 'rxjs/Subject';
import { AnonymousSubscription } from 'rxjs/Subscription';

type T              = any;
type StreamCallback = ( value: T ) => void;
export type Subscription   = AnonymousSubscription;

export
class Stream {
    private stream: Subject<T>;

    constructor() {
        this.stream = new Subject();
    }

    notify( what: any ) {
        this.stream.next( what );
    }

    subscribe( onNext: StreamCallback ): Subscription  {
        return this.stream.subscribe( onNext );
    }
}
