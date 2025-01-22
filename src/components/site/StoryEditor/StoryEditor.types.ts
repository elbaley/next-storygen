import { GRADIENT_PRESETS } from "./StoryEditor";

export type Story = {
  id: string;
  background:
    | {
        type: "color" | "image";
        value: string;
      }
    | {
        type: "gradient";
        value: GradientPreset;
      };
  components: {
    texts?: StoryText[];
    links?: StoryLink[];
  };
};

export type GradientPreset = keyof typeof GRADIENT_PRESETS;

export type Position = {
  x: number;
  y: number;
};

export type StoryText = {
  id: string;
  text: string;
  fontSize: number;
  background: string;
  color: string;
  position: Position;
};

export type StoryLink = {
  id: string;
  text: string;
  href: string;
  fontSize: number;
  background: string;
  color: string;
  position: Position;
};
