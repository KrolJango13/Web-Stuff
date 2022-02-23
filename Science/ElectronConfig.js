function electronConfig(atomicNum){
  const min = (a,b) => Math.min(Math.max(a,0),Math.max(b,0));
  return {
    "1s": min(2,atomicNum),
    "2s": min(2,atomicNum - 2),
    "2p": min(6,atomicNum - 4),
    "3s": min(2,atomicNum - 10),
    "3p": min(6,atomicNum - 12),
    "4s": min(2,atomicNum - 18),
    "3d": min(10,atomicNum - 20),
    "4p": min(6,atomicNum - 30),
    "5s": min(2,atomicNum - 36),
    "4d": min(10,atomicNum - 38),
    "5p": min(6,atomicNum - 48),
    "6s": min(2,atomicNum - 54),
    "4f": min(14,atomicNum - 56),
    "5d": min(10,atomicNum - 70),
    "6p": min(6,atomicNum - 80),
    "7s": min(2,atomicNum - 86),
    "5f": min(14,atomicNum - 88),
    "6d": min(10,atomicNum - 102),
    "7p": min(6,atomicNum - 112),
    toString: function(){
      return Object.keys(this).filter(x => this[x] > 0).map(x => `${x}${this[x]}`).join(" ")
    }
  }.toString()
}
