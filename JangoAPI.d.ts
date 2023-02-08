type JSPrimitive = bigint | boolean | null | number | string | undefined | symbol;
type EntryArray<T> = [string, T | EntryArray<T>]

interface Array<T> {
    middle(): T | [T, T];
    last(): T;
    
    max(): T;
    min(): T;
        
    divide(size: number): T[][];
    
    randomMember(): T;
    
    forEach1(func: (x: T) => void): void;
    
    cycleLeft(amount: number): void;
    
    cycleRight(amount: number): void;
}

interface Predicate<T> {
    (value: T): boolean;
}

interface String {
    toHexCodes(): string[];
    reverse(): string;
    
    isUpperCase(): boolean;
    isLowerCase(): boolean;
    
    stripChars(...chars: string[]): string;
    
    isNumeric(): boolean;
    isPureNumeric(): boolean;
    isAlphabetic(): boolean;
    isPureAlphabetic(): boolean;
    
    shiftCodePoints(amount: number): string;
    
    forEach(func: (char: string, index: number, str: string) => void): void;
    forEach1(func: (char: string) => void): void;
    
    map(func: (char: string) => string): string;
    
    some(predicate: Predicate<string>): boolean;
    every(predicate: Predicate<string>): boolean;
    
    shiftAlphabet(upperShift: number): string
    
    toRegionChar(): string;
    
    circleLetters(): string;
    
    unicodeAt(index?: number): string;
    
    getBytes(): Uint8Array;
    
    mapChars(charMap: Map<string,string>): string;
}

type Point = [number, number] | {
    x: number;
    y: number;
};

interface Shape3d {
    volume: number;
    surfaceArea: number;
}

declare namespace jango {}
declare namespace jango.math {
    function slope(a: number | Point, b: number | Point, c?: number, d?: number): number;
    function referenceAngle(degrees: number): number;
    function toDegrees(radians: number): number;
    function toRadians(degrees: number): number;
    function vector(a: number | Point, b: number | Point, c?: number, d?: number): number;
    function areaRegularPolygon(sideLength: number, numSides: number): number;
    function cube(sideLength: number): Shape3d;
    function rectangularPrism(length: number, width: number, height: number): Shape3d;
    function cone(radius: number, height: number): Shape3d;
    function pyramid4(baseLength: number, baseWidth: number, height: number): Shape3d;
    function sphere(radius: number): Shape3d;
    function cylinder(baseRadius: number, height: number): Shape3d;
    function factorial(x: number): number;
    function getFactors(x: number): number[];
    function range(startOrEnd: number, end?: number, step?: number): number[];
    function isPrime(x: number): boolean;
    function gcf(...nums: number[]): number;
    function lcm(...nums: number[]): number;
    function nor(a: number, b: number): number;
    function nand(a: number, b: number): number;
    function xnor(a: number, b: number): number;
    function isInt(x: number): boolean;
    function isSquare(x: number): boolean;
    function getDecimal(x: number): number;
    function primeFactors(x: number): number[];
}
declare namespace jango.random {
    function int(minOrExclusiveMax: number, exclusiveMax?: number): number;
    function arrayMember<T>(array: T[]): T;
    function boolean(weightTrue?: number): boolean;
}

interface Number {
    getFactors(x: number): number[];
    isPrime(x: number): boolean;
    isInt(x: number): boolean;
    isSquare(x: number): boolean;
    getDecimal(x: number): number;
}

declare namespace Object {
    function entriesRecursive(obj: object): EntryArray<JSPrimitive>[];
}

declare namespace jango.google {
    function getFormEntries(): object;
    function submitToForm(formKey: string, entries: object): void;
    function getFormKey(): string;
    function submit(): void;
}

declare namespace jango.html {
    function randHash32(): number;
    function makeHTML(tagName: string,properties?: object): HTMLElement;
    function evalXML(xml: string): Document;
    function evalHTML(html: string): Element;
    function makeTR(...cells: any[]): HTMLTableRowElement;
    function makeSelect(options: object, properties?: object): HTMLSelectElement;
    function downloaderButton(properties?: object): HTMLButtonElement;
}

declare namespace jango.logic {
    function nor(a: boolean, b: boolean): boolean;
    function nand(a: boolean, b: boolean): boolean;
    function xor(a: boolean, b: boolean): boolean;
    function xnor(a: boolean, b: boolean): boolean;
}

interface Boolean {
    bit(): 0 | 1;
}

declare namespace jango.crypto {
    function caesar(text: string, shift: number): string;
    function vigenere(key: string, text: string): string;
}

interface SciVar {
    value: number;
    unit: string;
}

interface ElectronConfiguration {
    "1s": number;
    "2s": number;
    "2p": number;
    "3s": number;
    "3p": number;
    "4s": number;
    "3d": number;
    "4p": number;
    "5s": number;
    "4d": number;
    "5p": number;
    "6s": number;
    "4f": number;
    "5d": number;
    "6p": number;
    "7s": number;
    "5f": number;
    "6d": number;
    "7p": number;
    toString: () => string;
}

declare namespace jango.science {
    var LIGHT_SPEED: readonly number;
    var PLANCK: readonly number;

    function getFrequency(wavelength: number, unit?: string): SciVar;
    function getFrequencyJ(energy: number): SciVar;
    function getWavelength(freq: number): SciVar;
    function getEnergy(freq: number): SciVar;

    function electronConfig(atomicNum: number): ElectronConfiguration;
    function nobleGasConfig(atomicNum: number): string;
    function bohrModel(atomicNum: number): number[];

    function balanceChem(elements: number[], maxCoef?: number): number[];
}