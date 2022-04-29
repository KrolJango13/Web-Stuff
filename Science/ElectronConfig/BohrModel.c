int min(int a, int b){
  return a < 1 ? 0 : a > b ? b : a;
}

int bohrModel(int num){
  int a = min(num - 10,8) + min(num - 20,10);
  int b = min(num - 18,2) + min(num - 30, 6) + min(num - 38, 10) + min(num - 56,14);
  int c = min(num - 36,2) + min(num - 48, 6) + min(num - 70, 10) + min(num - 88,14);
  int d = min(num - 54,2) + min(num - 80, 6) + min(num - 102,10);
  int e = min(num - 86,2) + min(num - 112,6);
  return (min(num,2) << 30) | (min(num - 2, 8) << 26)
  | (a << 21) | (b << 15) | (c << 9) | (d << 4) | e;
}
