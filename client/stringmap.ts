// An convenient immutable map, but beware that single-key updates are inefficient
class StringMap<V> {
    private internal : { [id : string] : V }
    constructor(object? : { [id : string] : V }) {
        for(let k in object) if(this.hasOwn(object, k)) {
            this.internal[k] = object[k]
        }
    }
    object() : { [id : string] : V } {
        let result : { [id : string] : V } = {}
        for(let k in this.internal) if(this.has(k)) {
            result[k] = this.internal[k]
        }
        return result
    }
    has(key : string) : boolean {
        return this.hasOwn(this.internal, key)
    }
    get(key : string) : {value? : V} {
        return this.has(key) ? {value: this.internal[key]} : {}
    }
    getOr(key : string, or : V) : V {
        return this.has(key) ? this.internal[key] : or
    }
    getOrLazy(key : string, f : () => V) : V {
        return this.has(key) ? this.internal[key] : f()
    }
    getOrPut(key : string, value : V) : StringMap<V> {
        let result = new StringMap<V>({})
        for(let k in this.internal) if(this.has(k)) {
            result.internal[k] = this.internal[k]
        }
        if(!result.has(key)) result.internal[key] = value
        return result
    }
    getOrPutLazy(key : string, f : () => V) : StringMap<V>  {
        let result = new StringMap<V>(this.internal)
        if(!result.has(key)) result.internal[key] = f()
        return result
    }
    put(key : string, value : V) : StringMap<V> {
        let result = new StringMap<V>(this.internal)
        result.internal[key] = value
        return result
    }
    remove(...keys : Array<string>) : StringMap<V> {
        let result = new StringMap<V>(this.internal)
        for(let i = 0; i < keys.length; i++) {
            delete result.internal[keys[i]]
        }
        return result
    }
    keys() : Array<string> {
        let result : Array<string> = []
        for(let k in this.internal) if(this.has(k)) {
            result.push(k)
        }
        return result
    }
    values() : Array<V> {
        let result : Array<V> = []
        for(let k in this.internal) if(this.has(k)) {
            result.push(this.internal[k])
        }
        return result
    }
    keyValues() : Array<{key : string, value : V}> {
        let result : Array<{key : string, value : V}> = []
        for(let k in this.internal) if(this.has(k)) {
            result.push({key: k, value: this.internal[k]})
        }
        return result
    }
    map<R>(f : (key : string, value : V) => R) : StringMap<R> {
        let result = new StringMap<R>({})
        for(let key in this.internal) if(this.has(key)) {
            result.internal[key] = f(key, this.internal[key])
        }
        return result
    }
    filter(f : (key : string, value : V) => boolean) : StringMap<V> {
        let result = new StringMap<V>({})
        for(let key in this.internal) if(this.has(key)) {
            if(f(key, this.internal[key])) result.internal[key] = this.internal[key]
        }
        return result
    }
    union(that : StringMap<V>, f : (key : string, thisValue : V, thatValue : V) => V = (k, v1, v2) => v2) : StringMap<V> {
        let result = new StringMap<V>(this.internal)
        for(let key in that.internal) if(that.has(key)) {
            if(this.has(key)) {
                result.internal[key] = f(key, this.internal[key], that.internal[key])
            } else {
                result.internal[key] = that.internal[key]
            }
        }
        return result
    }
    intersection(that : StringMap<V>, f : (key : string, thisValue : V, thatValue : V) => V = (k, v1, v2) => v2) : StringMap<V> {
        let result = new StringMap<V>({})
        for(let key in that.internal) if(that.has(key)) {
            if(this.has(key)) {
                result.internal[key] = f(key, this.internal[key], that.internal[key])
            }
        }
        return result
    }
    private hasOwn(object : { [id : string] : V }, key : string) : boolean {
        return this.hasOwnProperty.call(object, key)
    }
}
