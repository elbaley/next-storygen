export type Story = {
  id: string;
  background: {
    type: "color" | "image";
    value: string;
  };
  components: {
    texts?: StoryText[];
    links?: StoryLink[];
  };
};

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
