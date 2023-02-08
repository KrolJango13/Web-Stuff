// There are obviously easier ways to do this, but I wanted a stand-alone
// function that can compile to WASM without including dependencies

char* vigenere(char* key, char* text){
  int isOccupied = 0, keyLen = 0, txtLen = 0;
  while(key[keyLen]){keyLen++;}
  while(text[txtLen]){txtLen++;}
  char* encoded = &(text[txtLen + 1]);
  do {
    isOccupied = 0;
    for(int i = 0; i < txtLen; i++){
      if(encoded[i]){
        isOccupied = 1;
        encoded++;
        break;
      }
    }
  } while(isOccupied);
  
  int shift = 0;
  for(int i = 0; i < txtLen; i++){
    char c = text[i];
    if(c > 123 || c < 97){
      encoded[i] = c;
      shift++;
      continue;
    }
    char k = key[(i - shift) % keyLen] - 97;
    encoded[i] = (((c - 97) + k) % 26) + 97;
  }
  return encoded;
}
