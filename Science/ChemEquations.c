int base(int uniqueElemCt, int* elems, int maxGuesses){
  for(int i = 1; i < maxGuesses + 1; i++){
    for(int j = 1; j < maxGuesses + 1; j++){
      for(int k = 1; k < maxGuesses + 1; k++){
        for(int l = 1; l < maxGuesses + 1; l++){
          int allEqual = 1;
          for(int m = 0; m < uniqueElemCt; m++){
            int a = (elems[m] >> 24) * i;
            int b = ((elems[m] >> 16) % 256) * j;
            int c = ((elems[m] >> 8) % 256) * k;
            int d = (elems[m] % 256) * l;
            if(a + b != c + d){
              allEqual = 0;
              break;
            }
          }                       
          if(allEqual == 1){
            return (i << 24) | (j << 16) | (k << 8) | l;
          }
        }
      }
    }
  }
}

int synthesis(int uniqueElemCt, int* elems, int maxGuesses){
  for(int i = 1; i < maxGuesses + 1; i++){
    for(int j = 1; j < maxGuesses + 1; j++){
      for(int k = 1; k < maxGuesses + 1; k++){
        int allEqual = 1;
        for(int m = 0; m < uniqueElemCt; m++){
          int a = (elems[m] >> 16) * i;
          int b = ((elems[m] >> 8) % 256) * j;
          int p = (elems[m] % 256) * k;
          if(a + b != p){
            allEqual = 0;
            break;
          }
        }                       
        if(allEqual == 1){
          return (i << 16) | (j << 8) | k;
        }
      }
    }
  }
}

int decomposition(int uniqueElemCt, int* elems, int maxGuesses){
  for(int i = 1; i < maxGuesses + 1; i++){
    for(int j = 1; j < maxGuesses + 1; j++){
      for(int k = 1; k < maxGuesses + 1; k++){
        int allEqual = 1;
        for(int m = 0; m < uniqueElemCt; m++){
          int r = (elems[m] >> 16) * i;
          int a = ((elems[m] >> 8) % 256) * j;
          int b = (elems[m] % 256) * k;
          if(a + b != r){
            allEqual = 0;
            break;
          }
        }                       
        if(allEqual == 1){
          return (i << 16) | (j << 8) | k;
        }
      }
    }
  }
}
