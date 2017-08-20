import { connect } from "react-redux";

import { selectLocation } from "core/location/location.selectors";
import AppComponent from "./app.component";

export const mapStateToProps = state => ({
  location: selectLocation(state)
});

export default connect(mapStateToProps)(AppComponent);
