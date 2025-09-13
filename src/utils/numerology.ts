/**
 * Calcule le Chemin de Vie en numérologie
 * @param dateString - Date de naissance au format "YYYY-MM-DD"
 * @returns Le nombre du Chemin de Vie (1-9, 11, 22, ou 33)
 *
 * @example
 * calculateLifePathNumber("1990-03-15") // Retourne 1
 * calculateLifePathNumber("1985-07-22") // Retourne 7
 */
export function calculateLifePathNumber(dateString: string): number {
  // Validation du format de date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    throw new Error('Format de date invalide. Utilisez "YYYY-MM-DD"');
  }

  // Extraction des chiffres (suppression des tirets)
  const digits = dateString.replace(/-/g, "").split("").map(Number);

  // Vérification que tous les caractères sont des chiffres
  if (digits.some(isNaN)) {
    throw new Error("La date ne doit contenir que des chiffres et des tirets");
  }

  // Fonction utilitaire pour additionner les chiffres
  const sumDigits = (nums: number[]): number =>
    nums.reduce((acc, val) => acc + val, 0);

  // Somme initiale de tous les chiffres
  const total = sumDigits(digits);

  // Fonction récursive pour réduire le nombre
  const reduceNumber = (num: number): number => {
    // Nombres maîtres (ne pas réduire)
    if ([11, 22, 33].includes(num)) return num;

    // Nombres de base (1-9)
    if (num < 10) return num;

    // Réduction : additionner les chiffres du nombre
    const numDigits = num.toString().split("").map(Number);
    return reduceNumber(sumDigits(numDigits));
  };

  return reduceNumber(total);
}

/**
 * Calcule le nombre d'Expression (valeur numérologique du nom complet)
 * @param fullName - Nom complet (prénoms + nom de famille)
 * @returns Le nombre d'Expression (1-9, 11, 22, ou 33)
 */
export function calculateExpressionNumber(fullName: string): number {
  // Correspondance lettres-chiffres
  const letterValues: { [key: string]: number } = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };

  // Conversion du nom en chiffres
  const nameDigits = fullName
    .toUpperCase()
    .replace(/[^A-Z]/g, "") // Supprimer tout sauf les lettres
    .split("")
    .map((letter) => letterValues[letter] || 0)
    .filter((num) => num > 0); // Supprimer les 0 (caractères non reconnus)

  if (nameDigits.length === 0) {
    throw new Error("Aucune lettre valide trouvée dans le nom");
  }

  // Somme et réduction
  const sumDigits = (nums: number[]): number =>
    nums.reduce((acc, val) => acc + val, 0);
  const total = sumDigits(nameDigits);

  const reduceNumber = (num: number): number => {
    if ([11, 22, 33].includes(num)) return num;
    if (num < 10) return num;
    const numDigits = num.toString().split("").map(Number);
    return reduceNumber(sumDigits(numDigits));
  };

  return reduceNumber(total);
}
