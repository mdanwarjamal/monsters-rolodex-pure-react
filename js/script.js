const SearchBox = ({ placeholder, handleChange }) =>
  React.createElement("input", {
    className: "search",
    type: "search",
    placeholder: placeholder,
    onChange: handleChange,
  });
const Card = ({ monster }) =>
  React.createElement("div", { className: "cardcontainer" }, [
    React.createElement("h1", {}, monster.name),
    React.createElement("img", {
      src: `https://robohash.org/${monster.id}?set=set2&size=160x180`,
      alt: "monster",
    }),
    React.createElement("p", {}, monster.email),
  ]);
const CardList = ({ monsters }) =>
  React.createElement(
    "div",
    { className: "card-list" },
    monsters.map((monster) => React.createElement(Card, { monster: monster }))
  );
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchText: "",
    };
  }
  componentDidMount() {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const users = await response.json();
        this.setState({
          monsters: users,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }
  handleChange = (event) =>
    this.setState({
      searchText: event.target.value,
    });
  render() {
    const { monsters, searchText } = this.state;
    const filteredOutMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return React.createElement("section", { className: "App" }, [
      React.createElement(
        "header",
        {},
        React.createElement("h1", {}, "Monsters Rolodex | Pure React")
      ),
      React.createElement(SearchBox, {
        placeholder: "Search a Monster",
        handleChange: this.handleChange,
      }),
      React.createElement(CardList, { monsters: filteredOutMonsters }),
    ]);
  }
}
ReactDOM.render(React.createElement(App), document.getElementById("root"));
