declare module 'flakeid' {

    interface FlakeidOptions {
        seq: number;
        mid: number;
        timeOffset: number;
        lastTime: number;
    }

    class FlakeId {

        constructor(options?: Partial<FlakeidOptions>);

        gen(): string;
    }

    export default FlakeId;
}
