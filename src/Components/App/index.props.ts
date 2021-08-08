import {connect} from "react-redux";
import {mapStateToProps} from "./index.store";
import App from "./index";

export default connect(mapStateToProps, {})(App)
