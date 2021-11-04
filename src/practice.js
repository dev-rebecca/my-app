// import './App.css';
// import React from 'react';

// export default class SpeciesInfo extends React.Component {

//     state = {
//         loading: true,
//         species: null
//     }
   
//     async componentDidMount() {
//         const url = "ws.php?page=view-all-species";
//         const response = await fetch(url);
//         const data = await response.json();
//         this.setState({ species: data, loading: false });
//     }

//     render() {
//         if (this.state.loading) {
//             return <div>Loading...</div>;
//         }

//         if (!this.state.species) {
//             return <div>Didn't get any species info</div>;
//         }

//         return (
//             <div>
//                 <table class="table-auto">
//                 <thead>
//                 <tr>
//                     <th>Species</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 <tr>
//                     <td>{this.state.species.name}</td>
//                     <td>{this.state.species.date}</td>
//                     <td>{this.state.species.status}</td>
//                 </tr>
//                 </tbody>
//             </table>
//           </div>
//         );
//     }   
// }