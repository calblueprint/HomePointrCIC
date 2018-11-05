// import React from "react"
// import PropTypes from "prop-types"
// class TenantForm extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: props.tenant.name,
//       description: props.tenant.description,
//       email: props.tenant.email,
//       phone: props.tenant.phone,
//       nino: props.tenant.nino,
//       rent_min: props.tenant.rent_min,
//       rent_max: props.tenant.rent_max,
//       housing_type: props.tenant.housing_type,
//       property_type: props.tenant.property_type,
//       num_bedrooms: props.tenant.num_bedrooms,
//       location: props.tenant.location,
//       referral_agency_id: props.tenant.referral_agency_id,
//       date_needed: props.tenant.date_needed
//     };
//     this.handleTitleChange = this.handleTitleChange.bind(this);
//     this.handleContentChange = this.handleContentChange.bind(this);
//   }
//
//   handleTitleChange(e) {
//     this.setState({ capacity: e.target.value });
//   }
//
//   handleContentChange(e) {
//     this.setState({ description: e.target.value });
//   }
//
//   render() {
//     return (
//       <div>
//         <label>Name</label>
//         <input
//           type="text"
//           name="tenant[name]"
//           value={this.state.name}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Description</label>
//         <input
//           type="text"
//           name="tenant[description]"
//           value={this.state.description}
//           onChange={this.handleContentChange}
//         />
//
//         <label>Email</label>
//         <input
//           type="text"
//           name="tenant[email]"
//           value={this.state.email}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Phone</label>
//         <input
//           type="text"
//           name="tenant[phone]"
//           value={this.state.phone}
//           onChange={this.handleContentChange}
//         />
//
//         <label>Nino</label>
//         <input
//           type="text"
//           name="tenant[nino]"
//           value={this.state.nino}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Rent Min</label>
//         <input
//           type="text"
//           name="tenant[rent_min]"
//           value={this.state.rent_min}
//           onChange={this.handleContentChange}
//         />
//
//         <label>Rent Max</label>
//         <input
//           type="text"
//           name="tenant[rent_max]"
//           value={this.state.rent_max}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Housing Type</label>
//         <input
//           type="text"
//           name="tenant[housing_type]"
//           value={this.state.housing_type}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Property Type</label>
//         <input
//           type="text"
//           name="tenant[property_type]"
//           value={this.state.property_type}
//           onChange={this.handleContentChange}
//         />
//
//         <label>Num Bedrooms</label>
//         <input
//           type="text"
//           name="tenant[num_bedrooms]"
//           value={this.state.num_bedrooms}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Location</label>
//         <input
//           type="text"
//           name="tenant[location]"
//           value={this.state.location}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>RA ID</label>
//         <input
//           type="text"
//           name="tenant[referral_agency_id]"
//           value={this.state.referral_agency_id}
//           onChange={this.handleContentChange}
//         />
//
//         <label>Date Needed</label>
//         <input
//           type="text"
//           name="tenant[date_needed]"
//           value={this.state.date_needed}
//           onChange={this.handleContentChange}
//         />
//
//         <input type="submit" value="Update Post" />
//       </div>
//     );
//   }
//
//   // renderFields() {
//   //   return this.props.fieldNames.map((field, index) => {
//   //     if (this.props.mode === "edit") {
//   //       return (<div className="TextBox"> ${this.props.prevValues[index]} </div>)
//   //     }
//   //     return (<div className="TextBox"> ${this.props.fieldTypes[index]} </div>)
//   //   });
//   // }
//
//   // render () {
//   //   return (<div className="edit-form-page">
//   //     <h1> ${this.props.mode} ${this.props.type} </h1>
//
//   //   </div>)
//   // }
// }
//
// TenantForm.propTypes = {
//   mode: PropTypes.string,
//   type: PropTypes.string,
//   prevValues: PropTypes.array,
//   fieldNames: PropTypes.arrayOf(PropTypes.string),
//   fieldTypes: PropTypes.arrayOf(PropTypes.string)
// };
//
// export default TenantForm;
