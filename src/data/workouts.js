export let workouts = [
  { id: 1, titulo: "Flexiones de pecho clásicas", parte: "pecho", series: 3, repeticiones: 12 },
  { id: 2, titulo: "Press de banca", parte: "pecho", series: 4, repeticiones: 10 },
  { id: 3, titulo: "Remo con barra", parte: "espalda", series: 4, repeticiones: 12 },
  { id: 4, titulo: "Dominadas", parte: "espalda", series: 3, repeticiones: 8 },
  { id: 5, titulo: "Sentadillas", parte: "piernas", series: 4, repeticiones: 15 },
  { id: 6, titulo: "Prensa de piernas", parte: "piernas", series: 4, repeticiones: 12 },
  { id: 7, titulo: "Elevaciones laterales", parte: "hombros", series: 3, repeticiones: 12 },
  { id: 8, titulo: "Press militar", parte: "hombros", series: 4, repeticiones: 10 },
  { id: 9, titulo: "Curl de bíceps", parte: "brazos", series: 3, repeticiones: 12 },
  { id: 10, titulo: "Fondos en paralelas", parte: "brazos", series: 3, repeticiones: 10 },
  { id: 11, titulo: "Abdominales crunch", parte: "core", series: 3, repeticiones: 20 },
  { id: 12, titulo: "Plancha frontal", parte: "core", series: 3, repeticiones: 60 }, // segundos
  { id: 13, titulo: "Peso muerto", parte: "espalda", series: 4, repeticiones: 10 },
  { id: 14, titulo: "Zancadas", parte: "piernas", series: 3, repeticiones: 12 },
  { id: 15, titulo: "Elevaciones de gemelos", parte: "piernas", series: 4, repeticiones: 15 },
  { id: 16, titulo: "Face pull", parte: "hombros", series: 3, repeticiones: 12 },
];

// ⬇️ Función para devolver workouts filtrados
export function getFilteredWorkouts({ parte, limit }) {
  let result = workouts;

  // Filtro por parte del cuerpo (query string ?parte=pecho)
  if (parte) {
    result = result.filter(w => w.parte.toLowerCase() === parte.toLowerCase());
  }

  // Limitador de cantidad de resultados (query string ?limit=5)
  if (limit) {
    const n = parseInt(limit);
    if (!isNaN(n)) {
      result = result.slice(0, n);
    }
  }

  return result;
}