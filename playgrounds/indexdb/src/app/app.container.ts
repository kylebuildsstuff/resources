import { connect } from 'react-redux';

import { GenericObject } from 'src/shared/shared.types';
import App from './app.component';

export default connect(({ page }: GenericObject) => ({ page }))(App);
