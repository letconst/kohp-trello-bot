export default class Queue<T> {
    private _queue: T[] = [];

    public enqueue(value: T): void {
        this._queue.push(value);
    }

    public dequeue(): T | undefined {
        if (this._queue.length <= 0)
            return;

        return this._queue.shift();
    }

    public clear(): void {
        this._queue.length = 0;
    }

    public get size(): number {
        return this._queue.length;
    }
}
