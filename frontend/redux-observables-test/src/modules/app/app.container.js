import { connect } from "react-redux";

import AppComponent from "./app.component";
import { selectLocation } from "modules/location/location.selectors";
import { selectCount } from "modules/app/app.selectors";
import appActions from "modules/app/app.actions";

export const mapStateToProps = state => ({
  location: selectLocation(state),
  count: selectCount(state)
});

export const mapDispatchToProps = dispatch => ({
  increaseCount: () => dispatch(appActions.increaseCount()),
  decreaseCount: () => dispatch(appActions.decreaseCount())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
