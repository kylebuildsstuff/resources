import { connect } from "react-redux";

import AppComponent from "./app.component";
import { selectLocation } from "modules/location/location.selectors";

export const mapStateToProps = state => ({
  location: selectLocation(state)
});

export default connect(mapStateToProps, null)(AppComponent);
