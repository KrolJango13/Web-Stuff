async function load(){
    const getWASMBuff = (b64) => new Uint8Array(atob(b64).split("").map(x => x.codePointAt()));
    var atom_mass_b64 = "AGFzbQEAAAABhoCAgAABYAF/AXwDgoCAgAABAASEgICAAAFwAAAFg4CAgAABAAEGgYCAgAAAB5aAgIAAAgZtZW1vcnkCA\
AlhdG9tX21hc3MAAAqtgICAAAGngICAAAACQCAAQX9qIgBB9QBLDQAgAEEDdEEQaisDAA8LRAAAAAAAAAAACwu3h4CAAAEAQRALsAdU46WbxCDwP1CNl24\
SAxBA3SQGgZXDG0CgGi/dJAYiQKwcWmQ7nyVAEoPAyqEFKEDdJAaBlQMsQAAAAAAAADBAAAAAAAAAM0CuR+F6FC40QD0K16Nw/TZArkfhehROOEAIrBxaZ\
Ps6QLx0kxgEFjxA30+Nl27yPkCcxCCwcghAQESLbOf7uUFA001iEFj5Q0AGgZVDi4xDQESLbOf7CURA7nw/NV56RkBxPQrXo/BHQH9qvHSTeElAc2iR7Xz\
/SUDy0k1iEHhLQFyPwvUo7EtAgZVDi2x3TUBiEFg5tFhNQNnO91PjxU9AuB6F61FYUECDwMqhRW5RQKrx0k1iKFJAXrpJDAK7UkCgGi/dJL5TQGDl0CLb+\
VNAUI2XbhLzVEDLoUW2811VQEjhehSu51VARIts5/s5VkB1kxgEVs5WQESLbOf7OVdAzczMzMz8V0A1XrpJDLpYQBSuR+F6RFlARIts5/u5WUB7FK5H4Zp\
aQGQ730+N91pA0SLb+X4aXEAxCKwcWrRcQC/dJAaBrV1AcT0K16NwXkBmZmZmZuZfQGDl0CLbuV9AxSCwcmhpYEApXI/C9ZxgQNEi2/l+KmFAKVyPwvVcY\
UDByqFFtoNhQJMYBFYOnWFAsp3vp8YHYkDwp8ZLNx1iQOxRuB6Fy2JAAiuHFtn+YkAAAAAAAKhjQJqZmZmZ3WNAAAAAAABQZED2KFyPwp1kQD81XrpJ6GR\
A2c73U+MdZUD2KFyPwqFlQG3n+6nx3mVASOF6FK5PZkB1kxgEVp5mQDMzMzMz+2ZAtMh2vp9GZ0CPwvUoXMdnQNejcD0KB2hAw/UoXI9iaECsHFpkO59oQ\
HsUrkfhEmlAx0s3iUGMaUBmZmZmZuZpQI/C9ShcH2pAgZVDi2wfakDdJAaBlT9qQH9qvHSTwGtAcT0K16Pga0DNzMzMzEBsQDeJQWDlYGxA8KfGSzcBbUD\
+1HjpJuFsQLByaJHtwG1AqMZLN4mhbUA1XrpJDIJuQMuhRbbzYW5ACtejcD3ibkAK16NwPeJuQMP1KFyPYm9AAAAAAADAb0DsUbgehRFwQJqZmZmZIXBAV\
g4tsp0xcEAAAAAAAGBwQAAAAAAAUHBAAAAAAABgcEAAAAAAAKBwQAAAAAAAgHBAAAAAAADQcEAAAAAAAGBxQAAAAAAAkHFAAAAAAACAcUAAAAAAANBxQAA\
AAAAA4HFAAAAAAAAQckAAAAAAABByQAAAAAAAUHJAAAAAAABgckAAAAAAAGByQA==";
    var atom_mass_mod = await WebAssembly.instantiate(getWASMBuff(atom_mass_b64),{});
    
    var molar_mass_b64 = "AGFzbQEAAAABjYCAgAACYAF/AXxgA39/fwF8ApGAgIAAAQNlbnYJYXRvbV9tYXNzAAADgoCAgAABAQSEgICAAAFwAAAFg4\
CAgAABAAEGgYCAgAAAB5eAgIAAAgZtZW1vcnkCAAptb2xhcl9tYXNzAAEK1ICAgAABzoCAgAACAX8BfEQAAAAAAAAAACEEAkAgAEEBSA0AA0AgAigCAC\
EDIAQgASgCABAAIAO3oqAhBCABQQRqIQEgAkEEaiECIABBf2oiAA0ACwsgBAs=";
    var molar_mass_mod = await WebAssembly.instantiate(getWASMBuff(molar_mass_b64),{
        env: {
            atom_mass: atom_mass_mod.instance.exports.atom_mass
        }
    });
    window.molar_mass = function(elements){
        var nums = [], cts = [];
        for(var elem of elements){
            nums.push(elem.atomic_number || elem.num);
            cts.push(elem.count || elem.ct);
        }
        const mem_sect32 = (start) => new Uint32Array(molar_mass_mod.instance.exports.memory.buffer,start);
        mem_sect32(0).set(nums);
        mem_sect32(8).set(cts);
        return molar_mass_mod.instance.exports.molar_mass(elements.length,0,8);
    }
}
load();
