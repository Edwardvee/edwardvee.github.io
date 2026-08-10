export interface ModelEntry {
  label: string;
  url: string;
  /** Uniform scale after centering */
  scale: number;
  /** Y offset after centering (world units) */
  yOffset: number;
}

/** Definitive statue for the site — Aphrodite of Milos. */
export const ACTIVE_MODEL: ModelEntry = {
  label: "Milos",
  url: "/aphrodite_of_milos_a_plaster_cast.glb",
  scale: 1,
  yOffset: -0.15,
};
