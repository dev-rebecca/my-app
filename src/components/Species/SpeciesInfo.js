import React from "react";
import SpeciesForm from "../NewSpecies/SpeciesForm";

export default class SpeciesInfo extends React.Component {
  state = {
    loading: true,
    species: null,
  };

  async componentDidMount() {
    const url = "ws.php?page=view-all-species";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ species: data, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (!this.state.species) {
      return <div>Didn't get any species info</div>;
    }

    function test() {
      console.log("yooo");
    }

    return (
      <div>                   
        <table class="table-auto">
          <thead>
            <tr>
              <th>Species</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.species.map((item, i) => <p onClick={test} key={i}>{item.name}</p>)}</td>
              <td>{this.state.species.map((item, i) => <p key={i}>{item.status}</p>)}</td>
            </tr>
          </tbody>
        </table>
        <SpeciesForm />
      </div>
    );
  }
}
