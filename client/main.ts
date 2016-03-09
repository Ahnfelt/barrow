/// <reference path="../DefinitelyTyped/react/react.d.ts" />
/// <reference path="../DefinitelyTyped/react/react-dom.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');

class Input {
    
}

class Output {
    
}

class BoxType {
    constructor(public name : string, public inputs : Array<Input>, public outputs : Array<Output>) {}
}

class BoxInstance {
    constructor(public boxType : BoxType, public x : number, public y : number) {}
}
