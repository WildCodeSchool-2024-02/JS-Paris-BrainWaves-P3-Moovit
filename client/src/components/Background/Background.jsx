import "./background.css";

export default function Background() {
  const spanGenerator = () => {
    const tab = [];
    for (let i = 0; i < 12; i += 1) {
      tab.push(i);
    }

    return tab.map((element) => <span key={element} />);
  };
  return <div className="background">{spanGenerator()}</div>;
}
