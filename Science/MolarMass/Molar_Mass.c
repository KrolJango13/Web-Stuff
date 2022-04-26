double atom_mass(int atomic_num);

double molar_mass(int elem_ct, int* atomic_numbers, int* counts){
  double d = 0;
  for(int i = 0; i < elem_ct; i++){
    d += counts[i] * atom_mass(atomic_numbers[i]);
  }
  return d;
}
