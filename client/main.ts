/// <reference path="../immutable-js/type-definitions/Immutable.d.ts" />

import I = require('immutable');

class NumberType {}
class VectorType {}
type Type = NumberType | VectorType

class Slot {
    constructor(public name : string, public valueType : Type) {}
}

class BoxType {
    constructor(public name : string, public inputs : Array<Slot>, public outputs : Array<Slot>) {}
}

class BoxId {
    constructor(public id : string) {}
}

class BoxInstance {
    constructor(public id : BoxId, public boxType : BoxType, public x : number, public y : number, public ins : I.Map<string, BoxId>, public outs : I.Map<string, BoxId>) {}
}
