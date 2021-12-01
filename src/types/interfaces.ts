interface Dream {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  type: string;
  mood: string;
}

interface State {
  dreams: Array<Dream>;
}

export { State, Dream };
