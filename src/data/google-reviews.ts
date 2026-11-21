import { EMPRESA, TESTIMONIOS_REALES, type TestimonioItem } from './empresa';

interface GooglePlaceReview {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
  };
}

/**
 * Obtiene reseñas reales de Google Places API (New) en tiempo de compilación
 * si existe `GOOGLE_PLACES_API_KEY` en el entorno, filtrando exclusivamente
 * valoraciones de 4 y 5 estrellas e incluyendo la foto de perfil de Google.
 * Si no hay clave configurada o la API no responde, usa `TESTIMONIOS_REALES`.
 */
export async function getResenasHome(): Promise<TestimonioItem[]> {
  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return TESTIMONIOS_REALES;
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${EMPRESA.googleBusiness.placeId}?languageCode=es`;
    const res = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews',
      },
    });
    if (!res.ok) return TESTIMONIOS_REALES;

    const data = (await res.json()) as { reviews?: GooglePlaceReview[] };
    const filtered = (data.reviews ?? [])
      .filter((r) => (r.rating ?? 0) >= 4 && Boolean(r.text?.text || r.originalText?.text))
      .map((r, idx): TestimonioItem => {
        const texto = (r.text?.text ?? r.originalText?.text ?? '').trim();
        const autor = r.authorAttribution?.displayName?.trim() || 'Cliente verificado';
        return {
          id: `google-review-${idx}`,
          autor,
          tipoObra: r.relativePublishTimeDescription
            ? `Reseña en Google · ${r.relativePublishTimeDescription}`
            : 'Reseña verificada en Google',
          municipio: 'Asturias',
          titulo: `Valoración de ${r.rating} estrellas en Google`,
          cita: texto,
          imagenKey: (['integral', 'local', 'bano', 'cocina'] as const)[idx % 4],
          rating: r.rating,
          avatarUrl: r.authorAttribution?.photoUri,
        };
      });

    return filtered.length > 0 ? filtered : TESTIMONIOS_REALES;
  } catch {
    return TESTIMONIOS_REALES;
  }
}
