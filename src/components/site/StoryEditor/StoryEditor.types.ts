export type Story = {
  id: string;
  backgroundImage: string;
  texts: {
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    background: string;
    color: string;
  }[];
};
