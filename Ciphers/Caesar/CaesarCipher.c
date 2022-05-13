char caesar_letter(char c, int shift){
    if(c < 65 || c > 122) return c;
    char cshift = ((c < 91) * 65) + ((c > 96) * 97);
    if(!cshift)return c;
    return ((c - cshift + (((shift % 26) + 26) % 26)) % 26) + cshift;
}
