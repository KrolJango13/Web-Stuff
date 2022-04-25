char caesarCipher(char c, int shift){
  if(c < 65 || c > 122 || (c > 90 && c < 97))return c;
  int s = ((shift % 26) + 26) % 26;
  char c1 = c;
  for(int i = 0; i < s; i++){
    if(c1 == 'Z' || c1 == 'z'){
      c1 -= 26;
    }
    c1++;
  }
  return c1;
}
